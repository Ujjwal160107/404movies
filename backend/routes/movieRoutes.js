const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');

router.get('/', async (req, res) => {
    const keyword = req.query.keyword
        ? {
            title: {
                $regex: req.query.keyword,
                $options: 'i',
            },
        }
        : {};

    const movies = await Movie.find({ ...keyword });
    res.json(movies);
});

router.get('/:id', async (req, res) => {
    const movie = await Movie.findById(req.params.id);

    if (movie) {
        res.json(movie);
    } else {
        res.status(404).json({ message: 'Movie not found' });
    }
});

module.exports = router;
