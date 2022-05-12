const mongoose = require('mongoose');
const Joi = require('joi');
const config = require('config');

const filesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    type: {
        type: String,
        required: true,
        enum: ['directory', 'shared_folder', 'file'],
        default: 'directory'
    },
    size: {
        type: String,
        required: true,
        maxlength: 1024,
        default: ''
    },
    lastModified: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    resolvedPath: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024,
        default: 'Home/'
    },
    offline: {
        type: Boolean,
        default: false
    },
    extension: {
        type: String,
        minlength: 2,
        maxlength: 1024,
        default: 'none'
    }

});

function validateFile(file) {
    const schema = {
        name: Joi.string().min(5).max(255).required(),
        type: Joi.string().valid('directory', 'shared_folder', 'file').required(),
        size: Joi.string().max(1024).allow('').required(),
        lastModified: Joi.string().min(3).max(1024).required(),
        resolvedPath: Joi.string().min(5).max(1024).default('Home/'),
        offline: Joi.boolean().default(false),
        extension: Joi.string().min(2).max(1024).default('none')
    }

    return Joi.validate(file, schema);
}

const filesDb = [
    {
        id: '0',
        name: "All Files",
        type: "folder",
        owner: "Jessie Gou",
        offline: false,
        extension: "none",
        path: [{
            "id": '0',
            "name": "All Files"
        }]
    },
    {
        id: '1',
        name: 'Work Documents',
        type: 'directory',
        owner: 'Jessie Gou',
        size: '',
        lastModified: 'Wed, 27 Apr 22 21:14:12 GMT',
        resolvedPath: 'Home/Work Documents',
        offline: false,
        extension: "none",
        parent: '0',
        like: false,
        count: 0,
        path: [{
            "id": '0',
            "name": "All Files"
        }, {
            "id": '1',
            "type": "folder",
            "name": "Work Documents",
            "parentFolderID": '0'
        }]
    },
    {
        id: '2',
        name: 'Private Documents',
        type: 'directory',
        owner: 'Jessie Gou',
        size: '',
        lastModified: 'Wed, 02 Mar 22 07:14:12 GMT',
        resolvedPath: 'Home/Private Documents',
        offline: false,
        extension: "none",
        parent: '0',
        like: false,
        count: 1,
        path: [{
            "id": '0',
            "name": "All Files"
        }, {
            "id": '2',
            "type": "folder",
            "name": "Private Documents",
            "parentFolderID": '0'
        }]
    },
    {
        id: '3',
        name: 'Public Documents',
        type: 'shared_folder',
        owner: 'public',
        size: '',
        lastModified: 'Wed, 02 Mar 22 21:14:12 GMT',
        resolvedPath: 'Home/Public Documents',
        offline: false,
        extension: "shared_folder",
        parent: '0',
        like: false,
        count: 0,
        path: [{
            "id": '0',
            "name": "All Files"
        }, {
            "id": '3',
            "type": "folder",
            "name": "Public Documents",
            "parentFolderID": '0'
        }]
    },
    {
        id: '4',
        name: 'Ongoing projects.txt',
        type: 'document',
        owner: 'Jessie Gou',
        size: '1.2 Mb',
        lastModified: 'Wed, 02 Mar 22 21:14:12 GMT',
        resolvedPath: 'Home/Ongoing projects.txt',
        offline: false,
        extension: ".txt",
        parent: '0',
        like: true,
        preview: 'assets/uploads/preview/text-img.jpg'
    },
    {
        id: '5',
        name: 'Shopping list.docx',
        type: 'document',
        owner: 'Jessie Gou',
        size: '980 Kb',
        lastModified: 'Tue, 26 Apr 22 21:14:12 GMT',
        resolvedPath: 'Home/Shopping list.docx',
        offline: false,
        extension: ".docx",
        parent: '0',
        like: false,
        preview: 'assets/uploads/preview/document.webp'
    },
    {
        id: '6',
        name: 'pug.jpg',
        type: 'image',
        owner: 'Jessie Gou',
        size: '750 Kb',
        lastModified: 'Mon, 25 Apr 22 21:14:12 GMT',
        resolvedPath: 'Home/pug.jpg',
        offline: false,
        extension: ".jpg",
        parent: '0',
        like: true,
        preview: 'assets/uploads/pug.jpg'
    },
    {
        id: '7',
        name: 'Crash logs.jpg',
        type: 'document',
        owner: 'Jessie Gou',
        size: '980 Mb',
        lastModified: 'Wed, 02 Mar 22 21:14:12 GMT',
        resolvedPath: 'Home/Crash logs.jpg',
        offline: false,
        extension: ".jpg",
        parent: '0',
        like: false,
        preview: 'assets/images/etc/fuse-react-project-structure.jpg'
    },
    {
        id: '8',
        name: 'System logs.log',
        type: 'document',
        owner: 'Jessie Gou',
        size: '52 Kb',
        lastModified: 'Wed, 02 Mar 22 21:14:12 GMT',
        resolvedPath: 'Home/System logs.log',
        offline: false,
        extension: ".log",
        parent: '0',
        like: false,
        preview: 'assets/uploads/preview/crash_log.png'
    },
    {
        id: '9',
        name: 'Prices.xlsx',
        type: 'spreadsheet',
        owner: 'Jessie Gou',
        size: '27 Mb',
        lastModified: 'Wed, 02 Mar 22 21:14:12 GMT',
        resolvedPath: 'Home/Prices.xlsx',
        offline: false,
        extension: ".xlsx",
        parent: '0',
        like: false,
        preview: 'assets/uploads/preview/budget.png'
    },
    {
        id: '10',
        name: 'Anabelle Manual.mp4',
        type: 'document',
        owner: 'Jessie Gou',
        size: '1.1 Kb',
        lastModified: 'Wed, 02 Mar 22 21:14:12 GMT',
        resolvedPath: 'Home/Anabelle Manual.mp4',
        offline: false,
        extension: ".mp4",
        parent: '0',
        like: false,
        preview: 'assets/uploads/preview/movie.jpg'
    },
    {
        id: '11',
        name: 'Steam summer sale budget.xlsx',
        type: 'spreadsheet',
        owner: 'Jessie Gou',
        size: '505 Kb',
        lastModified: 'Wed, 02 Mar 22 21:14:12 GMT',
        resolvedPath: 'Home/Steam summer sale budget.xlsx',
        offline: false,
        extension: ".xlsx",
        parent: '0',
        like: false,
        preview: 'assets/uploads/preview/budget.png'
    },
    {
        id: '12',
        name: 'No_extension_file',
        type: 'file',
        owner: 'Jessie Gou',
        size: '205 Kb',
        lastModified: 'Wed, 02 Mar 22 21:14:12 GMT',
        resolvedPath: 'Home/No_extension_file',
        offline: false,
        extension: "none",
        parent: '0',
        like: false,
    },
    {
        id: '13',
        name: 'level1',
        type: 'directory',
        owner: 'Jessie Gou',
        size: '',
        lastModified: 'Wed, 27 Apr 22 21:14:12 GMT',
        resolvedPath: 'Home/Private Documents/level1',
        offline: false,
        extension: "none",
        parent: '2',
        like: false,
        count: 2,
        path: [{
            "id": '0',
            "name": "All Files"
        }, {
            "id": '2',
            "name": "Private Documents"
        }, {
            "id": '13',
            "type": "folder",
            "name": "level1",
            "parentFolderID": '2'
        }]
    },
    {
        id: '14',
        name: 'hello-level1.txt',
        type: 'file',
        owner: 'Jessie Gou',
        size: '205 Kb',
        lastModified: 'Wed, 02 Mar 22 21:14:12 GMT',
        resolvedPath: 'Home/Private Documents/level1/hello-level1.txt',
        offline: false,
        extension: ".txt",
        parent: '13',
        like: false,
        path: [{
            "id": '0',
            "name": "All Files"
        }, {
            "id": '2',
            "name": "Private Documents"
        }, {
            "id": '13',
            "type": "folder",
            "name": "level1",
            "parentFolderID": '2'
        }, {
            "id": '14',
            "type": "file",
            "name": "hello-level1.txt",
            "parentFolderID": '13'
        }]
    },
    {
        id: '15',
        name: 'level2',
        type: 'directory',
        owner: 'Jessie Gou',
        size: '',
        lastModified: 'Wed, 27 Apr 22 21:14:12 GMT',
        resolvedPath: 'Home/Private Documents/level1/level2',
        offline: false,
        extension: "none",
        parent: '13',
        like: false,
        count: 1,
        path: [{
            "id": '0',
            "name": "All Files"
        }, {
            "id": '2',
            "name": "Private Documents"
        }, {
            "id": '13',
            "type": "folder",
            "name": "level1",
            "parentFolderID": '2'
        }, {
            "id": '15',
            "type": "folder",
            "name": "level2",
            "parentFolderID": '13'
        }]
    },
    {
        id: '16',
        name: 'hello-level2.txt',
        type: 'file',
        owner: 'Jessie Gou',
        size: '205 Kb',
        lastModified: 'Wed, 02 Mar 22 21:14:12 GMT',
        resolvedPath: 'Home/Private Documents/level1/level2/hello-level2.txt',
        offline: false,
        extension: ".txt",
        parent: '15',
        like: false,
        path: [{
            "id": '0',
            "name": "All Files"
        }, {
            "id": '2',
            "name": "Private Documents"
        }, {
            "id": '13',
            "type": "folder",
            "name": "level1",
            "parentFolderID": '2'
        }, {
            "id": '15',
            "type": "folder",
            "name": "level2",
            "parentFolderID": '13'
        }, {
            "id": '16',
            "type": "file",
            "name": "hello-level2.txt",
            "parentFolderID": '15'
        }]
    },
    {
        id: '17',
        name: 'Empty folder',
        type: 'directory',
        owner: 'Jessie Gou',
        size: '',
        lastModified: 'Wed, 27 Apr 22 21:14:12 GMT',
        resolvedPath: 'Home/Private Documents/level1/level2/Empty folder',
        offline: false,
        extension: "none",
        parent: '15',
        like: false,
        count: 0,
        path: [{
            "id": '0',
            "name": "All Files"
        }, {
            "id": '2',
            "name": "Private Documents"
        }, {
            "id": '13',
            "type": "folder",
            "name": "level1",
            "parentFolderID": '2'
        }, {
            "id": '15',
            "type": "folder",
            "name": "level2",
            "parentFolderID": '13'
        }, {
            "id": '17',
            "type": "folder",
            "name": "Empty folder",
            "parentFolderID": '15'
        }]
    },
    {
        id: '18',
        name: 'Empty folder',
        type: 'directory',
        owner: 'Jessie Gou',
        size: '',
        lastModified: 'Wed, 27 Apr 22 21:14:12 GMT',
        resolvedPath: 'Home/Public Documents/Empty folder',
        offline: false,
        extension: "none",
        parent: '3',
        like: false,
        count: 0,
        path: [{
            "id": '0',
            "name": "All Files"
        }, {
            "id": '3',
            "name": "Public Documents"
        }, {
            "id": '18',
            "type": "folder",
            "name": "Empty folder",
            "parentFolderID": '3'
        }]
    },
]

const Files = {};

Files.findAllByParentId = (id) => {
    console.log('Files.findAllByParentId: id', id);
    return filesDb.filter(element => element.parent === id);
}

Files.findOneById = (id) => {
    return filesDb.find(element => element.id === id);
}

Files.length = () => { return filesDb.length; }

Files.add = (Files) => {
    const res = filesDb.push(Files);
    return (res && true);
}

Files.delete = (id) => {
    const file = filesDb.find(element => element.id === id);

    const index = filesDb.findIndex(element => element.id === id)
    // console.log('Files.delete - index', index);

    if (index < 0) return null;

    filesDb.splice(index, 1);
    // console.log('Files.delete - filesDb.find(file)', filesDb.find(element => element.id === id));

    return file;
}

exports.Files = Files;
exports.filesDb = filesDb;
exports.filesSchema = filesSchema;
exports.validate = validateFile;