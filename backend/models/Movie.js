const mongoose = require('mongoose');

const movieSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        poster: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            required: true,
            default: 0,
        },
        regretLevel: {
            type: String,
            required: true,
            default: 'High',
        },
        year: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
