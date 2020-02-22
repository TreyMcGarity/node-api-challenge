const express = require('express');
const actionDb = require('../data/helpers/actionModel');

const router = express.Router();

router.get('/', (req, res) => {
    actionDb.get()
    .then((act) => {
        res.status(200).json(act);
    })
    .catch(() => {
        res.status(500).json({
        message: "couldn't get actions"
        })
    })
});

router.get('/:id', validateActionsId, (req, res) => {
    if (!req.actions) {
        res.status(500).json({
            message: "couldn't get the action"
          })
    } else {
        res.status(200).json(req.actions);
    }
});

router.put('/:id', validateActionsId, (req, res) => {
    actionDb.update(req.actions.id, req.body)
    .then((act) => {
      res.status(200).json(act);
    })
    .catch(() => {
      res.status(500).json({
        message: "couldn't update action"
      })
    })
});

router.delete('/:id', validateActionsId, (req, res) => {
    actionDb.remove(req.actions.id)
    .then((act) => {
        res.status(200).json(act);
    })
    .catch(() => {
        res.status(500).json({
            message: "couldn't delete action"
        })
    })
});

//middleware

function validateActionsId(req, res, next) {
    actionDb.get(req.params.id)
    .then(act => {
      if (act) {
        req.actions = act;
        next();
      } else {
        res.status(400).json({
          message: "invalid action id"
        })
      }
    })
    .catch(() => {
      res.status(500).json({
        message: "error retrieving the action id"
      })
    })
  }

module.exports = router;