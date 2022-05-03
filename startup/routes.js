const express = require('express');
const cors = require("cors");
const path = require('path')
const users = require('../routes/users');
const auth = require('../routes/auth');
const uploads = require('../routes/uploads');
const files = require('../routes/files');
const trash = require('../routes/trash');
const error = require('../middleware/error');

module.exports = function (app) {
    app.use(cors());
    app.use('/static', express.static(path.join(__dirname, "../public")));
    app.use(express.json());
    app.use("/api/uploads", uploads);
    app.use('/api/users', users);
    app.use('/api/auth', auth);
    app.use('/api/file-manager-app/files', files);
    app.use('/home', files);
    app.use('/trash', trash);
    app.use(error);
};