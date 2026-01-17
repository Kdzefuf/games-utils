export interface Aircraft {
    id: string;
    name: string;
    imageSource: number;
    wingspan: number;
    maxSpeed: number;
    description: string;
}

const aircraftData: Aircraft[] = [
    {
        id: 'b747',
        name: 'Boeing 747',
        imageSource: require('../../assets/images/boeing747.png'),
        wingspan: 68.5,
        maxSpeed: 988,
        description: 'Legendary jumbo jet known for long-haul flights.',
    },
    {
        id: 'a380',
        name: 'Airbus A380',
        imageSource: require('../../assets/images/airbusA380.png'),
        wingspan: 79.8,
        maxSpeed: 1020,
        description: 'World’s largest passenger airliner.',
    },
    {
        id: 'cessna172',
        name: 'Cessna 172',
        imageSource: require('../../assets/images/cessna172.png'),
        wingspan: 11.0,
        maxSpeed: 226,
        description: 'Most popular training aircraft worldwide.',
    },
];

export default aircraftData;