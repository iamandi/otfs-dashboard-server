const mongoose = require('mongoose');
const Joi = require('joi');
const config = require('config');

const trashDb = [{
    id: '21',
    name: 'trashed1.txt',
    type: 'file',
    owner: 'Jessie Gou',
    size: '205 Kb',
    lastModified: 'Mon, 02 May 22 21:14:12 GMT',
    resolvedPath: 'Home/Private Documents/level1/hello-level1.txt',
    offline: false,
    extension: ".txt",
    parent: '13'
},
{
    id: '24',
    name: 'junk.txt',
    type: 'file',
    owner: 'Jessie Gou',
    size: '205 Kb',
    lastModified: 'Sat, 12 Mar 22 21:14:12 GMT',
    resolvedPath: 'Home/Private Documents/level1/hello-level1.txt',
    offline: false,
    extension: ".txt",
    parent: '13'
},
{
    id: '36',
    name: 'trash.txt',
    type: 'file',
    owner: 'Jessie Gou',
    size: '205 Kb',
    lastModified: 'Fri, 22 April 22 21:14:12 GMT',
    resolvedPath: 'Home/Private Documents/level1/level2/hello-level2.txt',
    offline: false,
    extension: ".txt",
    parent: '15'
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