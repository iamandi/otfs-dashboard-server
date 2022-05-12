'use strict';
const { Trash } = require('../models/trash');
const { Files, filesDb } = require('../models/file');
const path = require('path')
const moment = require('moment');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const files = await Trash.getAll();

    res.send(files);
});

router.get('/:id', async (req, res) => {
    console.log('Get trash by id')

    const { id } = req.params;
    console.log({ id });

    if (!id || id === 'undefined') return res.status(400).send("Provide valid id");

    const file = await Trash.findOneById(id);
    // console.log('file', file);

    if (!file) return res.status(404).send("Not found!");

    res.send(file);
});

router.post('/', async (req, res) => {
    const { id } = req.body;
    console.log({ id });

    if (!id || id === 'undefined' || typeof id !== 'string') return res.status(400).send("Provide valid id");

    const file = Files.delete(id);
    if (!file) return res.status(404).send('The file with the given ID was not found.');

    file.lastModified = new Date();

    const result = Trash.add(file);
    console.log('Add to trash successful?', result);

    if (!result) {
        console.log('Couldnt add file to trash. TODO: reverse the operation');
        return res.status(500).send('Couldnt add file to trash. TODO: reverse the operation');
    }

    res.send(file);
});

router.post('/restore', async (req, res) => {
    const { id } = req.body;
    console.log('/restore:', { id });

    if (!id || id === 'undefined' || typeof id !== 'string') return res.status(400).send("Provide valid id");

    const file = Trash.findOneById(id);
    if (!file) return res.status(404).send('The file with the given ID was not found.');

    file.lastModified = new Date();

    const result = Files.add(file);
    console.log('restore successful?', result);

    const resp = Trash.delete(id);
    if (!resp) return res.status(500).send('Could not delete file in the Trash DB');

    if (!result) {
        console.log('Couldnt add file to trash. TODO: reverse the operation');
        return res.status(500).send('Couldnt add file to trash. TODO: reverse the operation');
    }

    res.send(file);
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    console.log({ id });
    console.log('req.params', req.params);

    if (!id || id === 'undefined') return res.status(400).send("Provide valid id");

    const file = await Trash.delete(id);
    if (!file) return res.status(404).send('The file with the given ID was not found.');

    console.log('file', file);


    res.send(file);
});

module.exports = router;
