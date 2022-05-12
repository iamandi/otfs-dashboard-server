'use strict';
const { Like } = require('../models/like');
const moment = require('moment');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    console.log('Get all liked')
    const files = await Like.getAll();

    res.send(files);
});

router.get('/:id', async (req, res) => {
    console.log('Get liked by id')

    const id = req.params.id;
    console.log({ id });

    if (!id || id === 'undefined') return res.status(400).send("Provide id");

    const file = await Like.findOneById(id);
    console.log('file', file);

    if (!file) return res.status(404).send("Not found!");

    res.send(file);
});

router.post('/', async (req, res) => {
    console.log('Update like')
    const { id, like } = req.body;
    console.log({ id, like });

    if (!id || id === 'undefined' || typeof id !== 'string') { console.log('id is invalid'); return res.status(400).send('Provide ID'); }
    if (like === 'undefined') { console.log('like is invalid'); return res.status(400).send('Provide valid like property'); }

    const resp = Like.findOneByIdAndUpdate(id, like);
    console.log('resp', resp);

    if (!resp || resp.length === 0) return res.status(404).send('Not found!');

    res.send(resp);
});

module.exports = router;
