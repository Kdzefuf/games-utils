import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
} from 'react-native-reanimated';
import { useAppContext } from '../contexts/AppContext';
import { BALL_SIZE, GRAVITY, DAMPING } from '../utils/physics';

const { width, height } = Dimensions.get('window');

const GameScreen: React.FC = () => {
    const { gameMode, sensitivity } = useAppContext();

    const x = useSharedValue(width / 2 - BALL_SIZE / 2);
    const y = useSharedValue(height / 2 - BALL_SIZE / 2);
    const vy = useRef(0);

    const ballXs = useRef(
        Array.from({ length: 5 }, (_, i) =>
            useSharedValue(width / 2 - BALL_SIZE / 2 + (i - 2) * 80)
        )
    ).current;

    const ballYs = useRef(
        Array.from({ length: 5 }, () => useSharedValue(100))
    ).current;

    const ballVys = useRef(Array(5).fill(0)).current;

    const isDragging = useRef(false);
    const activeBallIndex = useRef<number | null>(null);

    useEffect(() => {
        if (gameMode === 'classic' || gameMode === 'multi') {
            let rafId: number;
            const update = () => {
                if (gameMode === 'classic' && !isDragging.current) {
                    vy.current += GRAVITY * sensitivity;
                    vy.current *= DAMPING;
                    y.value += vy.current;

                    if (y.value >= height - BALL_SIZE) {
                        vy.current = -vy.current * 0.7;
                        y.value = height - BALL_SIZE;
                        if (Math.abs(vy.current) < 0.5) vy.current = 0;
                    }
                } else if (gameMode === 'multi') {
                    for (let i = 0; i < 5; i++) {
                        if (!isDragging.current || activeBallIndex.current !== i) {
                            ballVys[i] += GRAVITY * sensitivity;
                            ballVys[i] *= DAMPING;
                            ballYs[i].value += ballVys[i];

                            if (ballYs[i].value >= height - BALL_SIZE) {
                                ballVys[i] = -ballVys[i] * 0.7;
                                ballYs[i].value = height - BALL_SIZE;
                                if (Math.abs(ballVys[i]) < 0.5) ballVys[i] = 0;
                            }
                        }
                    }
                }
                rafId = requestAnimationFrame(update);
            };
            rafId = requestAnimationFrame(update);

            return () => {
                if (rafId) cancelAnimationFrame(rafId);
            };
        }
    }, [ballVys, ballYs, gameMode, sensitivity, y]);

    const handlePress = (e: any) => {
        const { locationX, locationY } = e.nativeEvent;
        const targetX = locationX - BALL_SIZE / 2;
        const targetY = locationY - BALL_SIZE / 2;

        if (gameMode === 'zero-g') {
            x.value = withSpring(targetX * sensitivity);
            y.value = withSpring(targetY * sensitivity);
        } else if (gameMode === 'classic') {
            isDragging.current = true;
            x.value = targetX;
            y.value = targetY;
            vy.current = 0;
            setTimeout(() => (isDragging.current = false), 100);
        } else if (gameMode === 'multi') {
            let minDist = Infinity;
            let closestIndex = -1;
            for (let i = 0; i < 5; i++) {
                const dx = ballXs[i].value - targetX;
                const dy = ballYs[i].value - targetY;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < minDist && dist < 100) {
                    minDist = dist;
                    closestIndex = i;
                }
            }
            if (closestIndex !== -1) {
                isDragging.current = true;
                activeBallIndex.current = closestIndex;
                ballXs[closestIndex].value = targetX;
                ballYs[closestIndex].value = targetY;
                ballVys[closestIndex] = 0;
                setTimeout(() => {
                    isDragging.current = false;
                    activeBallIndex.current = null;
                }, 100);
            }
        }
    };

    const classicStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: x.value }, { translateY: y.value }],
    }));

    const multiStyles = ballXs.map((_, i) =>
        useAnimatedStyle(() => ({
            transform: [{ translateX: ballXs[i].value }, { translateY: ballYs[i].value }],
        }))
    );

    return (
        <View style={styles.container} onTouchEnd={handlePress}>
            {gameMode === 'classic' && <Animated.View style={[styles.ball, classicStyle]} />}
            {gameMode === 'zero-g' && <Animated.View style={[styles.ball, classicStyle]} />}
            {gameMode === 'multi' &&
                ballXs.map((_, i) => (
                    <Animated.View key={i} style={[styles.ball, multiStyles[i]]} />
                ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#e0e5ec' },
    ball: {
        position: 'absolute',
        width: BALL_SIZE,
        height: BALL_SIZE,
        borderRadius: BALL_SIZE / 2,
        backgroundColor: '#FFA726',
    },
});

export default GameScreen;