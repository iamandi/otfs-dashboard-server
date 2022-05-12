'use strict';
const { Files, validate } = require('../models/file');
const mongoose = require('mongoose');
const path = require('path')
const moment = require('moment');
const express = require('express');
const router = express.Router();

router.get('/nested-file-structure-db', async (req, res) => {
    const params = req.params;
    const query = req.query;
    console.log('params', params)
    console.log('query', query)

    res.send('nested-file-structure-db');
});

router.get('/file/:fileId', async (req, res) => {
    console.log('req.params.fileId', req.params.fileId);

    const { fileId } = req.params;
    if (!fileId || fileId === 'undefined') return res.status(400).send('provide file id');

    const file = await Files.findOneById(fileId);
    console.log('file', file);

    if (!file) return res.status(404).send('Not found!');

    if (file.type === 'folder' || file.type === 'directory' || file.type === 'shared_folder')
        return res.status(400).send('Downloading a folder is not allowed.')

    const resolvedPath = file.resolvedPath.split('Home/')[1];
    console.log({ resolvedPath });

    const fileDirectory = path.join(__dirname, `../file-system/${resolvedPath}`);
    console.log({ fileDirectory });

    res.type('application/octet-stream');
    res.download(fileDirectory, (err) => {
        if (err) {
            console.log('\nerr', err);
            if (res.headersSent) {
                if (err.statusCode === 404) return res.status(err.statusCode).end('File not found');
                if (err.statusCode === 500) return res.status(err.statusCode).end('Interval server error');
                return res.status(500).end(err.message);
            }
        }
        console.log('file downloaded!');
    });
});

router.get('/folder/:parentId', async (req, res) => {
    console.log('\n\n\n/folder/:parentId')
    console.log({ 'req.path': req.path, parentId: req.params.parentId })

    const { parentId } = req.params;
    if (!parentId || parentId === 'undefined') return res.status(400).send('provide parent id');

    const files = await Files.findAllByParentId(parentId);

    if (!files || files.length === 0) {
        const file = await Files.findOneById(parentId);

        if (!file || file === '') return res.status(404).send('Parent folder not found!');
    }

    // Empty folder
    res.send(files);
});

router.get('/folder-by-id/:id', async (req, res) => {
    console.log('/folder-by-id/:id')
    console.log({ 'req.path': req.path, id: req.params.id })

    const { id } = req.params;
    if (!id || id === 'undefined') return res.status(400).send('provide folder id');

    const file = await Files.findOneById(id);
    console.log('>>>>> file', file);

    if (!file || file === '') return res.status(404).send('Not found!');

    res.send(file);
});

// router.post('/', async (req, res) => {
//     const { name, type, owner, size, lastModified, resolvedPath, offline, extension } = req.body;

//     const id = mongoose.Types.ObjectId();
//     console.log({ id });

//     Files.add({
//         id,
//         name,
//         type, owner, size, lastModified, resolvedPath, offline, extension
//     })

//     res.send({
//         id,
//         name,
//         type, owner, size, lastModified, resolvedPath, offline, extension
//     });
// });

router.post('/createFolder', async (req, res) => {
    const { name, parent } = req.body;

    const id = mongoose.Types.ObjectId();
    console.log({ id });

    const resp = Files.findOneById(parent);
    console.log('resp', resp);

    const fileStruct = {
        id,
        name,
        owner: 'Jessie Gou',
        size: '',
        type: 'directory',
        lastModified: moment().utc(),
        resolvedPath: (resp) ? resp.resolvedPath : 'Home/',
        offline: false,
        extension: 'none',
        parent
    }

    Files.add(fileStruct);

    res.send(fileStruct);
});

router.delete('/remove/:fileId', async (req, res) => {
    const fileId = req.params.fileId;
    const id = await Files.remove(fileId);

    res.send(id);
});

module.exports = router;
