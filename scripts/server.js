// Simple Express server setup to serve the build output
const compression = require('compression');
const helmet = require('helmet');
const express = require('express');

const dotenv = require('dotenv');
dotenv.config();

const db = require('../queries');

const path = require('path');

const app = express();
app.use(helmet());
app.use(compression());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3001;
const DIST_DIR = './dist';

const router = express.Router();
router.get('/api/identidades', db.getAllIdentidades);
router.get('/api/identidades/:id', db.getSingleIdentidad);
router.post('/api/identidades', db.createIdentidad);
router.put('/api/identidades/:id', db.updateIdentidad);
router.delete('/api/identidades/:id', db.removeIdentidad);

app.use(express.static(DIST_DIR));
app.use('/', router);
app.use('*', (req, res) => {
    res.sendFile(path.resolve(DIST_DIR, 'index.html'));
});
app.listen(PORT, () => console.log(` Server started: http://${HOST}:${PORT}`));
