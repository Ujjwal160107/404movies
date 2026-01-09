const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Movie = require('./models/Movie');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const importData = async () => {
    try {
        await Movie.deleteMany();
        await User.deleteMany();

        const createdUsers = await User.insertMany([
            {
                name: 'Admin User',
                email: 'admin@example.com',
                password: '$2a$10$BitTone7.3.1.2.3.4.5.6.7.8.9.0.1.2.3.4.5.6.7.8.9',
            },
        ]);

        const adminUser = createdUsers[0]._id;

        const movies = [
            {
                title: 'The Procrastinator',
                description: 'A documentary about doing it tomorrow. Maybe.',
                poster: '/images/procrastinator.png',
                category: 'Because Sleep Is Optional',
                rating: 4.5,
                regretLevel: 'High',
                year: 2024,
            },
            {
                title: '404: Sleep Not Found',
                description: 'You will regret watching this at 3AM.',
                poster: '/images/404sleep.png',
                category: 'Movies You’ll Regret at 3AM',
                rating: 5.0,
                regretLevel: 'Extreme',
                year: 2023,
            },
            {
                title: 'Why Are We Here?',
                description: 'Existential dread the movie. Featuring a chair.',
                poster: '/images/whyhere.png',
                category: 'Exam Tomorrow Specials',
                rating: 3.8,
                regretLevel: 'Moderate',
                year: 2022,
            },
            {
                title: 'Doom Scrolling: The Movie',
                description: 'Just one more swipe. Just one more hour.',
                poster: '/images/procrastinator.png',
                category: 'Just One More Movie',
                rating: 4.9,
                regretLevel: 'Critical',
                year: 2024,
            },
            {
                title: 'Deadline Panic',
                description: 'Based on a true story happening right now.',
                poster: '/images/whyhere.png',
                category: 'Exam Tomorrow Specials',
                rating: 4.7,
                regretLevel: 'Panic',
                year: 2023,
            }
        ];

        await Movie.insertMany(movies);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

importData();
