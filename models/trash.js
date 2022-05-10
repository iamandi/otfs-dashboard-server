const mongoose = require('mongoose');
const Joi = require('joi');
const config = require('config');

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
                "id": "41",
                "type": "file",
                "name": "trashed1.txt",
                "parentFolderID": "0"
            }
        ]
    },
    {
        "id": "51",
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
                "id": "51",
                "type": "file",
                "name": "trashed1.txt",
                "parentFolderID": "0"
            }
        ]
    }];

const Trash = {};

Trash.getAll = () => {
    return trashDb;
}

Trash.findOneById = (id) => {
    return trashDb.find(element => element.id === id.toString());
}

Trash.remove = (id) => {
    trashDb.splice(trashDb.findIndex(v => v.id === id), 1);

    return id;
}

exports.Trash = Trash;