'use strict';
const { Trash } = require('../models/trash');
const { Files } = require('../models/files');
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

router.post('/', async (req, res) => {
    const { id } = req.body;
    console.log({ id });

    const file = await Files.findByIdAndUpdate(id,
        {
            trashed: true
        }, { new: false });

    if (!file) return res.status(404).send('The file with the given ID was not found.');

    res.send(file);
})

router.delete('/:fileId', async (req, res) => {
    const fileId = req.params.fileId;
    const id = await Trash.remove(fileId);

    res.send(id);
})

router.delete('/remove/:fileId', async (req, res) => {
    const fileId = req.params.fileId;
    const id = await Trash.remove(fileId);

    res.send(id);
})

module.exports = router;
