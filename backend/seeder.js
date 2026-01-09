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

        const categories = [
            'Because Sleep Is Optional',
            'Movies You’ll Regret at 3AM',
            'Exam Tomorrow Specials',
            'Just One More Movie',
            'Endless Franchises',
            'CGI Overload',
            'Dark & Gritty Reboots'
        ];

        // Helper to get random category
        const getRandomCategory = () => categories[Math.floor(Math.random() * categories.length)];

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
            },
            // Avengers (Previous Batch)
            {
                title: 'Avengers: The Neverending',
                description: 'Just when you thought it was over, there is another sequel.',
                poster: '/images/avengers1.png',
                category: getRandomCategory(),
                rating: 4.8,
                regretLevel: 'Productivity Zero',
                year: 2012,
            },
            {
                title: 'Age of Ultron: AI Gone Wrong',
                description: 'What happens when you let ChatGPT write code.',
                poster: '/images/avengers2.png',
                category: getRandomCategory(),
                rating: 4.2,
                regretLevel: 'High',
                year: 2015,
            },
            {
                title: 'Infinity War: 50% Less Work',
                description: 'Perfectly balanced, as all procrastination should be.',
                poster: '/images/avengers1.png',
                category: getRandomCategory(),
                rating: 4.9,
                regretLevel: 'Snappable',
                year: 2018,
            },
            {
                title: 'Endgame: Finally Over?',
                description: '3 hours of your life you will never get back. Worth it.',
                poster: '/images/avengers4.png',
                category: getRandomCategory(),
                rating: 5.0,
                regretLevel: 'Emotional Damage',
                year: 2019,
            },
            {
                title: 'Avengers Assembly Required',
                description: 'Some disassembly required.',
                poster: '/images/avengers5.png',
                category: getRandomCategory(),
                rating: 4.1,
                regretLevel: 'Moderate',
                year: 2021,
            },
            // DC Movies (New Batch)
            {
                title: 'Superman: Returns to Sleep',
                description: 'Faster than a speeding deadline.',
                poster: '/images/superman_returns.png',
                category: getRandomCategory(),
                rating: 3.9,
                regretLevel: 'Moderate',
                year: 2006,
            },
            {
                title: 'Black Adam: Hierarchy of Wasted Time',
                description: 'The hierarchy of power in the DC universe didn’t change much.',
                poster: '/images/black_adam.png',
                category: getRandomCategory(),
                rating: 4.0,
                regretLevel: 'Electrifying',
                year: 2022,
            },
            {
                title: 'Justice League: The Snyder Cut (12 Hours Long)',
                description: 'If you have time for this, you have too much free time.',
                poster: '/images/justice_league.png',
                category: getRandomCategory(),
                rating: 4.4,
                regretLevel: 'Epic Length',
                year: 2021,
            },
            {
                title: 'Superman: Man of Stealing Time',
                description: 'Symbol of hope... that you will finish your work tomorrow.',
                poster: '/images/superman_bvs.png',
                category: getRandomCategory(),
                rating: 4.5,
                regretLevel: 'High',
                year: 2016,
            },
            {
                title: 'The Batman: It’s Raining in Gotham Again',
                description: 'Dark, brooding, and soaking wet. Just like your mood on Monday.',
                poster: '/images/the_batman.png',
                category: getRandomCategory(),
                rating: 4.8,
                regretLevel: 'Vengeance',
                year: 2022,
            }
        ];

        await Movie.insertMany(movies);

        console.log('Data Imported with DC & Avengers!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

importData();
