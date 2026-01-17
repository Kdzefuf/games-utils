import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../screens/HomeScreen';
import FlightSimulator from '../screens/FlightSimulator';
import AircraftDatabase from '../screens/AircraftDatabase';
import WeatherRadar from '../screens/WeatherRadar';
import PilotLogbook from '../screens/PilotLogbook';

const getTabBarIcon = (routeName: string, focused: boolean): string => {
    switch (routeName) {
        case 'Home':
            return focused ? 'home' : 'home-outline';
        case 'Simulator':
            return focused ? 'airplane' : 'airplane-outline';
        case 'Aircraft':
            return focused ? 'business' : 'business-outline';
        case 'Weather':
            return focused ? 'cloud' : 'cloud-outline';
        case 'Logbook':
            return focused ? 'book' : 'book-outline';
        default:
            return 'help-circle';
    }
};

const renderTabBarIcon = (
    routeName: string,
    focused: boolean,
    color: string,
    size: number
) => {
    const iconName = getTabBarIcon(routeName, focused);
    return <Icon name={iconName} size={size} color={color} />;
};

const Tab = createBottomTabNavigator();

const AppNavigator: React.FC = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) =>
                        renderTabBarIcon(route.name, focused, color, size),
                    tabBarActiveTintColor: '#4ECDC4',
                    tabBarInactiveTintColor: '#718096',
                    headerStyle: { backgroundColor: '#0A2463' },
                    headerTintColor: '#FFFFFF',
                })}
            >
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="Simulator" component={FlightSimulator} />
                <Tab.Screen name="Aircraft" component={AircraftDatabase} />
                <Tab.Screen name="Weather" component={WeatherRadar} />
                <Tab.Screen name="Logbook" component={PilotLogbook} />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;