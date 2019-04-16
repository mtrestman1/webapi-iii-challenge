const express = require('express');

const Posts = require('../helpers/postDb');

const router = express.Router();


router.get('/', (req, res) => {
    return Posts.get()
    .then(posts => {
        res.status(201).json(posts)
    })
    .catch(error => {
        res.status(500).json({ message: 'The posts could not be retrieved'})
    })
})

router.post('/', (req, res) => {
    const {text, user_id}  = req.body;
    if(!text || !user_id) {
        return res.status(400).json({ message: 'Please provide text and userID'})
    } else {
        return Posts.insert(req.body)
        .then(post => {
            res.status(201).json(post)
        })
        .catch(error => {
            res.status(500).json({ error: 'There was an error while saving this post to the database'})
        })
    }
})

router.get('/:id', (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(404).json({ message: 'the post with the specified ID does not exist'})
    } else {
        return Posts.getById(id)
        .then(post => {
            res.status(201).json(post)
        })
        .catch(error => {
            res.status(500).json({ error: 'The information could not be retrieved'})
        })
    }
})

router.delete('/:id', (req, res) => {
    const {id} = req.params;
    if(!id) {
        return res.status(404).json({ message: 'The post with the specified ID does not exist'})
    } else {
        return Posts.remove(id)
        .then(user => {
            res.status(201).end()
        })
        .catch(error => {
            res.status(500).json({ error: 'This Post could not be deleted'})
        })
       }
})

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { text, user_id } = req.body;

    if(!id) {
        return res.status(404).json({ message: 'the post with the specified id does not exist'})
    } else if (!text || !user_id) {
        return res.status(400).json({ message: 'Please provide text and userID'})
    } else {
        return Posts.update(id, {text, user_id})
        .then(updated => {
            res.status(200).json(updated)
        })
        .catch(error => {
            res.status(500).json({ error: 'this post could not be updated'})
        })
    }
})




module.exports = router;