'use strict';
const { Files } = require('../models/files');
const moment = require('moment');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    console.log('Get all liked')
    const files = await Files.getAllLiked();

    res.send(files);
});

router.post('/', async (req, res) => {
    console.log('Update like')
    const { id, like } = req.body;
    // console.log({ id, like });

    const resp = Files.update(id, like);
    // console.log('resp', resp);

    res.send(resp);
});

module.exports = router;
