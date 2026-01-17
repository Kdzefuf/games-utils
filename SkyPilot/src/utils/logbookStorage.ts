import AsyncStorage from '@react-native-async-storage/async-storage';

export interface LogEntry {
    id: string;
    date: string; // ISO string
    aircraft: string;
    hours: number;
    route: string;
}

const STORAGE_KEY = '@pilot_logbook_entries';

export const saveLogEntry = async (entry: Omit<LogEntry, 'id'>): Promise<void> => {
    try {
        const existing = await getLogEntries();
        const newEntry: LogEntry = {
            ...entry,
            id: Date.now().toString(),
        };
        const updated = [newEntry, ...existing];
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (error) {
        console.error('Failed to save log entry:', error);
    }
};

export const getLogEntries = async (): Promise<LogEntry[]> => {
    try {
        const json = await AsyncStorage.getItem(STORAGE_KEY);
        return json ? JSON.parse(json) : [];
    } catch (error) {
        console.error('Failed to load log entries:', error);
        return [];
    }
};