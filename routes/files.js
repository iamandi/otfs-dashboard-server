'use strict';
const { Files, validate } = require('../models/files');
const mongoose = require('mongoose');
const path = require('path')
const moment = require('moment');
const express = require('express');
const router = express.Router();

// router.get('/', async (req, res) => {
//     console.log('>> route', req.path);
//     console.log('req.params', req.params)
//     const files = await Files.getAll();

//     res.send(files);
// });

router.get('/nested-file-structure-db', async (req, res) => {
    const params = req.params;
    const query = req.query;
    console.log('params', params)
    console.log('query', query)

    res.send('nested-file-structure-db');
});

// router.get('/:fileId', async (req, res) => {
//     console.log('req.params.fileId', req.params.fileId);

//     const { fileId } = req.params;

//     const files = await Files.findOneById(fileId);

//     res.send(files);
// });

router.get('/file/:fileId', async (req, res) => {
    console.log('req.params.fileId', req.params.fileId);

    const { fileId } = req.params;

    const file = await Files.findOneById(fileId);
    console.log('file', file);

    if (file.type === 'folder' || file.type === 'directory' || file.type === 'shared_folder')
        return res.status(400).send('Downloading a folder is not allowed.')

    const resolvedPath = file.resolvedPath.split('Home/')[1];
    console.log({ resolvedPath });

    const fileDirectory = path.join(__dirname, `../file-system/${resolvedPath}`);
    console.log({ fileDirectory });

    // res.type('application/octet-stream');
    // res.sendFile('Private Documents/level1/hello-level2.txt', { root: fileDirectory }, (err) => {
    // res.attachment(file.name).sendFile(fileDirectory, (err) => {
    //     if (err) {
    //         console.log('\nerr', err);
    //         if (err.statusCode === 404) return res.status(err.statusCode).end('File not found');
    //         if (err.statusCode === 500) return res.status(err.statusCode).end('Interval server error');
    //         return res.status(500).end(err.message);
    //     }

    //     res.end();
    // });

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
        console.log('file downloaded');
    });
});

router.get('/folder/:parentId', async (req, res) => {
    console.log('/folder/:parentId')
    console.log('req.path', req.path);
    console.log('req.params.parentId', req.params.parentId);

    const { parentId } = req.params;

    const files = await Files.findAllByParentId(parentId);
    if (parentId === 0) console.log('>>>>>>>>>>');
    // if (parentId !== 0) console.log('files', files);

    res.send(files);
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
