const express = require('express');
const projecDb = require('../data/helpers/projectModel');

const router = express.Router();

router.post('/', validateProject, (req, res) => {
    projecDb.insert(req.body)
    .then((proj) => {
        res.status(201).json(proj);
    })
    .catch(() => {
        res.status(500).json({
          message: "couldn't post this project"
        })
    })
});

router.get('/', (req, res) => {
    projecDb.get()
    .then((proj) => {
        res.status(200).json(proj);
    })
    .catch(() => {
        res.status(500).json({
          message: "couldn't get projects"
        })
    })
});

router.get('/:id', validateProjectId, (req, res) => {
    if (!req.project) {
        res.status(500).json({
            message: "couldn't get the project"
          })
    } else {
        res.status(200).json(req.project);
    }
});

router.put('/:id', validateProjectId, (req, res) => {
    projecDb.update(req.project.id, req.project)
    .then((proj) => {
        res.status(200).json(proj);
    })
    .catch(() => {
        res.status(500).json({
            message: "couldn't update project"
        })
    })
});

router.delete('/:id', validateProjectId, (req, res) => {
    projecDb.remove(req.project.id)
    .then((proj) => {
        res.status(200).json(proj);
    })
    .catch(() => {
        res.status(500).json({
            message: "couldn't delete project"
        })
    })
});

//middleware

function validateProjectId(req, res, next) {
    projecDb.get(req.params.id)
    .then((proj) => {
        if (proj) {
            req.project = proj;
            next();
        } else {
            res.status(400).json({
                message: "invalid project id"
            })
        }
    })
    .catch(() => {
        res.status(500).json({
            message: "error retrieving the project id"
        })
    })
}

function validateProject(req, res, next) {
    if(!req.body) {
        res.status(400).json({
            message: "missing project data"
        })
    } else if (!req.body.name && !req.body.description) {
        res.status(400).json({
            message: "missing required fields"
        })
    } else {
        next();
    }
}

module.exports = router;