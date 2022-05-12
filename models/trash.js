const mongoose = require('mongoose');
const Joi = require('joi');
const config = require('config');
const { filesDb } = require('./file');

const trashDb = [
    {
        "id": "31",
        "name": "trashed1.txt",
        "type": "file",
        "owner": "Jessie Gou",
        "size": "",
        "lastModified": "Wed, 27 Apr 22 21:14:12 GMT",
        "resolvedPath": "Home/trashed1.txt",
        "offline": false,
        "extension": "none",
        "parent": "0",
        "like": false,
        "trashed": false,
        "count": 0,
        "path": [
            {
                "id": "0",
                "name": "All Files"
            },
            {
                "id": "31",
                "type": "file",
                "name": "trashed1.txt",
                "parentFolderID": "0"
            }
        ]
    },
    {
        "id": "41",
        "name": "trashed2.txt",
        "type": "file",
        "owner": "Jessie Gou",
        "size": "",
        "lastModified": "Wed, 27 Apr 22 21:14:12 GMT",
        "resolvedPath": "Home/trashed1.txt",
        "offline": false,
        "extension": "none",
        "parent": "0",
        "like": false,
        "trashed": false,
        "count": 0,
        "path": [
            {
                "id": "0",
                "name": "All Files"
            },
            {
                "id": "41",
                "type": "file",
                "name": "trashed2.txt",
                "parentFolderID": "0"
            }
        ]
    },
    {
        "id": "51",
        "name": "trashed3.txt",
        "type": "file",
        "owner": "Jessie Gou",
        "size": "",
        "lastModified": "Wed, 27 Apr 22 21:14:12 GMT",
        "resolvedPath": "Home/trashed1.txt",
        "offline": false,
        "extension": "none",
        "parent": "0",
        "like": false,
        "trashed": false,
        "count": 0,
        "path": [
            {
                "id": "0",
                "name": "All Files"
            },
            {
                "id": "51",
                "type": "file",
                "name": "trashed3.txt",
                "parentFolderID": "0"
            }
        ]
    }];

const Trash = {};

Trash.add = (file) => {
    const res = trashDb.push(file);
    return (res && true);
}

Trash.getAll = () => {
    return trashDb;
}

Trash.findOneById = (id) => {
    return trashDb.find(element => element.id === id.toString());
}

Trash.delete = (id) => {
    const index = trashDb.findIndex(element => element.id === id)
    // console.log('Trash.delete - index', index);

    if (index < 0) return null;

    const file = trashDb.splice(index, 1);
    console.log('trashDb.splice: file', file);

    return file;
}

// TRASH
// Files.getAllTrashed = () => {
//     return filesDb.filter(element => element.like === true);;
// }

// Files.findOneTrashedById = (id) => {
//     return filesDb.find(element => element.id === id && element.trashed);
// }

// Files.findTrashByIdAndUpdate = (id, { trashed }) => {
//     console.log({ trashed });
//     const file = filesDb.find(element => element.id === id);
//     file.trashed = trashed;

//     return filesDb.find(element => element.id === id);
// }

// Files.removeTrashPermanently = (id) => {
//     const file = filesDb.findIndex(element => element.id === id)
//     if (!file || !file.trashed) return { error: true };

//     filesDb.splice(file, 1);

//     return id;
// }

exports.Trash = Trash;