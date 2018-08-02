const express = require('express');
const path = require('path');

const rootPath = path.join(__dirname, '..');

function routing(app) {
  app.use('/api/sounds', express.static(path.join(rootPath, './etc/sound-collections.json')));
  app.use('/public', express.static(path.join(rootPath, 'public')));
  app.use('/sounds', express.static(path.join(rootPath, 'sounds')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(rootPath, '/public/index.html'));
  });
}

module.exports = routing;
