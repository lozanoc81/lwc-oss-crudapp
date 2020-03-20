var promise = require('bluebird');

var options = {
    // Initialization Options
    promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = process.env.DATABASE_URL;
//console.log('connectionString=' + connectionString);
var db = pgp(connectionString);

function getAllIdentidades(req, res, next) {
    db.any('select * from identidades')
        .then(function(data) {
            let elementos = [];
            data.forEach(e => {
                e.visible = false;
                elementos.push(e.id);
            });
            res.status(200).json({
                status: 'success',
                data: data,
                elementos: elementos,
                message: 'Retrieved ALL identidades'
            });
        })
        .catch(function(err) {
            return next(err);
        });
}

function getSingleIdentidad(req, res, next) {
    var idenID = parseInt(req.params.id);
    db.one('select * from identidades where id = $1', idenID)
        .then(function(data) {
            res.status(200).json({
                status: 'success',
                data: data,
                message: 'Retrieved ONE identidades'
            });
        })
        .catch(function(err) {
            return next(err);
        });
}

function createIdentidad(req, res, next) {
    console.log('req=' + JSON.stringify(req.body));
    req.body.id = parseInt(req.body.id);
    db.none(
        'INSERT INTO identidades(id, ine, pasaporte, nombre, apellido_paterno, apellido_materno, vigente) ' +
            'VALUES(${id}, ${ine}, ${pasaporte}, ${nombre}, ${apellido_paterno}, ${apellido_materno}, ${vigente})',
        req.body
    )
        .then(function() {
            res.status(200).json({
                status: 'success',
                message: 'Inserted one identidades'
            });
        })
        .catch(function(err) {
            return next(err);
        });
}

function updateIdentidad(req, res, next) {
    db.none(
        'update identidades set ine=$1, pasaporte=$2, nombre=$3, apellido_paterno=$4, apellido_materno=$5, vigente=$6 where id=$7',
        [
            req.body.ine,
            req.body.pasaporte,
            req.body.nombre,
            req.body.apellido_paterno,
            req.body.apellido_materno,
            req.body.vigente,
            parseInt(req.params.id)
        ]
    )
        .then(function() {
            res.status(200).json({
                status: 'success',
                message: 'Updated identidades'
            });
        })
        .catch(function(err) {
            return next(err);
        });
}

function removeIdentidad(req, res, next) {
    var idenID = parseInt(req.params.id);
    db.result('delete from identidades where id = $1', idenID)
        .then(function(result) {
            /* jshint ignore:start */
            res.status(200).json({
                status: 'success',
                message: `Removed ${result.rowCount} identidades`
            });
            /* jshint ignore:end */
        })
        .catch(function(err) {
            return next(err);
        });
}

module.exports = {
    getAllIdentidades: getAllIdentidades,
    getSingleIdentidad: getSingleIdentidad,
    createIdentidad: createIdentidad,
    updateIdentidad: updateIdentidad,
    removeIdentidad: removeIdentidad
};
