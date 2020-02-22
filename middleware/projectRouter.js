const express = require('express');
const projectDb = require('../data/helpers/projectModel');
const actionDb = require('../data/helpers/actionModel');

const router = express.Router();

router.post('/', validateProject, (req, res) => {
    projectDb.insert(req.body)
    .then((proj) => {
        res.status(201).json(proj);
    })
    .catch(() => {
        res.status(500).json({
          message: "couldn't post this project"
        })
    })
});

router.post('/:id/actions', validateProjectId, validateActions, (req, res) => {
    actionDb.insert(req.body)
    .then((proj) => {
      res.status(201).json(proj);
    })
    .catch(() => {
      res.status(500).json({
        message: "couldn't post this action"
      })
    })
});

router.get('/', (req, res) => {
    projectDb.get()
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

router.get('/:id/actions', validateProjectId, (req, res) => {
    projectDb.getProjectActions(req.project.id)
    .then((proj) => {
        res.status(200).json(proj);
    })
    .catch(() => {
        res.status(500).json({
            message: "couldn't get projects actions"
        })
    })
});

router.put('/:id', validateProjectId, (req, res) => {
    projectDb.update(req.project.id, req.body)
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
    projectDb.remove(req.project.id)
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
    projectDb.get(req.params.id)
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

function validateActions(req, res, next) {
    response = {
        project_id: req.params.id,
        description: req.body.description,
        notes: req.body.notes
    }
    if(!req.body) {
      res.status(400).json({
        message: "missing actions data"
      })
    } else if (!req.body.description && !req.body.notes) {
      res.status(400).json({
        message: "missing required actions fields"
      })
    } else {
      req.body = response;
      next();
    }
}  

module.exports = router;