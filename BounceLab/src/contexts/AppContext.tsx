import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type GameMode = 'classic' | 'zero-g' | 'multi';
export type Theme = 'light' | 'dark';

interface AppContextType {
    theme: Theme;
    toggleTheme: () => void;
    sensitivity: number;
    setSensitivity: (value: number) => void;
    gameMode: GameMode;
    setGameMode: (mode: GameMode) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
    THEME: 'app_theme',
    SENSITIVITY: 'app_sensitivity',
    GAME_MODE: 'app_game_mode',
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>('light');
    const [sensitivity, setSensitivity] = useState<number>(1.0);
    const [gameMode, setGameMode] = useState<GameMode>('classic');

    useEffect(() => {
        const loadSettings = async () => {
            try {
                const savedTheme = await AsyncStorage.getItem(STORAGE_KEYS.THEME);
                const savedSensitivity = await AsyncStorage.getItem(STORAGE_KEYS.SENSITIVITY);
                const savedGameMode = await AsyncStorage.getItem(STORAGE_KEYS.GAME_MODE);

                if (savedTheme === 'dark' || savedTheme === 'light') {
                    setTheme(savedTheme);
                }
                if (savedSensitivity) {
                    setSensitivity(parseFloat(savedSensitivity));
                }
                if (savedGameMode === 'classic' || savedGameMode === 'zero-g' || savedGameMode === 'multi') {
                    setGameMode(savedGameMode as GameMode);
                }
            } catch (e) {
                console.warn('Failed to load settings', e);
            }
        };
        loadSettings();
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        AsyncStorage.setItem(STORAGE_KEYS.THEME, newTheme);
    };

    useEffect(() => {
        AsyncStorage.setItem(STORAGE_KEYS.SENSITIVITY, sensitivity.toString());
    }, [sensitivity]);

    useEffect(() => {
        AsyncStorage.setItem(STORAGE_KEYS.GAME_MODE, gameMode);
    }, [gameMode]);

    return (
        <AppContext.Provider
            value={{
                theme,
                toggleTheme,
                sensitivity,
                setSensitivity,
                gameMode,
                setGameMode,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within AppProvider');
    }
    return context;
};

export const getThemeColors = (theme: Theme) => ({
    background: theme === 'dark' ? '#121212' : '#f5f7fa',
    surface: theme === 'dark' ? '#1e1e1e' : '#ffffff',
    text: theme === 'dark' ? '#ffffff' : '#333333',
    primary: '#4A90E2',
});