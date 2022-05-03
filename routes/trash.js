'use strict';
const { Trash } = require('../models/trash');
const path = require('path')
const moment = require('moment');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const files = await Trash.getAll();

    res.send(files);
});

router.get('/:fileId', async (req, res) => {
    console.log('req.params.fileId', req.params.fileId);

    const { fileId } = req.params;

    const files = await Trash.findOneById(fileId);

    res.send(files);
});

router.delete('/remove/:fileId', async (req, res) => {
    const fileId = req.params.fileId;
    const id = await Trash.remove(fileId);

    res.send(id);
})

module.exports = router;
