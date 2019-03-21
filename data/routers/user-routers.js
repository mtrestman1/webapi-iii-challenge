const express = require('express');

const Users = require('../helpers/userDb');

const router = express.Router();

function upperCase(req, res, next) {
    const { name } = req.body;
    name.toUpperCase;
next();
}

router.get('/', (req, res) => {
    return Users.get()
    .then(users => {
        res.status(201).json(users)
    })
    .catch(error => {
        res.status(500).json({ message: 'the users information could not be retrieved'})
    })
})

router.post('/', upperCase, (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ message: 'please provide name for this user'})
    } else {
    return Users.insert({name})
    .then(user => {
        res.status(201).json(user)
    })
    .catch(error => {
        res.status(500).json({ error: 'There was an error while saving this user to the database'})
    })
    }
})

router.get('/:id', (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(404).json({ message: 'the user with the specified ID does not exist'})
    } else {
        return Users.getById(id)
        .then(user => {
            res.status(201).json(user)
        })
        .catch(error => {
            res.status(500).json({ error: 'The information could not be retrieved'})
        })
    }
})

router.delete('/:id', (req, res) => {
    const {id} = req.params;
  
    if(!id) {
        return res.status(404).json({ message: 'The user with the specified ID does not exist'})
    } else {
        return Users.remove(id)
        .then(user => {
            res.status(201).end()
        })
        .catch(error => {
            res.status(500).json({ error: 'this user could not be deleted'})
        })
       }
})

router.put('/:id', upperCase, (req, res) => {
    const { id } = req.params;
    const name  = req.body;
    if(!id) {
        return res.status(404).json({ message: 'the user with the specified id does not exist'})
    } else if (!name) {
        return res.status(400).json({ message: 'Please provide a name'})
    } else {
        return Users.update(id, name)
        .then(updated => {
            res.status(200).json(updated)
        })
        .catch(error => {
            res.status(500).json({ error: 'this user could not be updated'})
        })
    }
})


module.exports = router