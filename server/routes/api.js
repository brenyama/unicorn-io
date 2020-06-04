const express = require('express');

const router = express.Router();

const models = require('../models/model')

const Projects = models.Projects;
const Boards = models.Boards;
const Comments = models.Comments;

// require in any controllers here
// const xController = require('../controllers/xControlelr')


/**
 * Projects API
 */

router.get('/projects', (req, res) => {
  Projects.find({} , (err, projects) => {
    if (err) res.status(404).json(err)
    res.json(projects)
  });
})

router.post('/projects', (req, res) => {
  Projects.create({
    ...req.body,
    created_by: "user 1",
    published_date: new Date(),
    boards: []
  }, (err, project) => {
    if (err) return res.status(404).json(err)
    res.status(200).json(project)
  })
})

router.get('/projects/:id', (req, res) => {
  Projects.findById(req.params.id, (err, project) => {
    if (err) res.status(404).json(err)
    res.json(project)
  })
})

router.delete('/projects/:id', (req, res) => {
  Projects.findByIdAndDelete(req.params.id, (err, project) => {
    if (err) return res.status(404).json(err)
    res.json(project)
  })
})

/**
 * Boards API
 */

router.get('/projects/:id/boards', (req, res) => {
  Projects.findById(req.params.id, (err, project) => {
    if (err) return res.status(404).json(err)
    res.json(project.boards)
  })
})

router.post('/projects/:id/boards', (req, res) => {
  Projects.findById(req.params.id, (err, project) => {
    if (err) return res.status(404).json(err)

    const newBoard = new Boards({
      ...req.body,
      published_date: new Date(),
      comments: [],
    })

    project.boards.push(newBoard);  

    project.save((err) => {
      if (err) return res.status(400).json(err);
      res.status(200).send(newBoard);
    });
  })
})

router.get('/projects/:pid/boards/:bid', (req, res) => {
  Projects.findById(req.params.pid, (err, project) => {
    if (err) return res.status(404).json(err)
    
    const board = project.boards.id(req.params.bid)
    if (!board) return res.status(404).send('error, couldnt find board')

    res.status(200).json(board)
  })
})


router.delete('/projects/:pid/boards/:bid', (req, res) => {
  Projects.findById(req.params.pid, (err, project) => {
    if (err) return res.status(404).json(err)
    
    const board = project.boards.id(req.params.bid)  
    if (!board) return res.status(404).send('error, couldnt find board')

    board.remove()

    project.save((err) => {
      if (err) return res.status(400).json(err);
      res.status(200).json(board)
    });
  })
})

/**
 * Comments API
 */

router.get('/projects/:pid/boards/:bid/comments', (req, res) => {
  Projects.findById(req.params.pid, (err, project) => {
    if (err) return res.status(404).json(err)

    const board = project.boards.id(req.params.bid)  
    if (!board) return res.status(404).send('error, couldnt find board')

    res.status(200).json(board.comments);
  })
})

router.post('/projects/:pid/boards/:bid/comments', (req, res) => {
  Projects.findById(req.params.pid, (err, project) => {
    if (err) return res.status(404).json(err)

    const board = project.boards.id(req.params.bid);
    if (!board) return res.status(404).send('error, couldnt find board');

    const newComment = new Comments({
      ...req.body,
      published_date: new Date(),
      resolved: false
    })

    board.comments.push(newComment)
    
    project.save((err) => {
      if (err) res.status(400).json(err);

      res.status(200).json(newComment)
    });
  })
})

router.get('/projects/:pid/boards/:bid/comments/:cid', (req, res) => {
  Projects.findById(req.params.pid, (err, project) => {
    if (err) return res.status(404).json(err)

    const board = project.boards.id(req.params.bid);
    if (!board) return res.status(404).send('error, couldnt find board');

    const comment = board.comments.id(req.params.cid);
    if (!comment) return res.status(404).json(err);

    res.status(200).json(comment)
  })
})

router.delete('/projects/:pid/boards/:bid/comments/:cid', (req, res) => {
  Projects.findById(req.params.pid, (err, project) => {
    if (err) return res.status(404).json(err);

    const board = project.boards.id(req.params.bid);
    if (!board) return res.status(404).json(err);

    const comment = board.comments.id(req.params.cid);
    if (!comment) return res.status(404).json(err);

    comment.remove()

    project.save((err) => {
      if (err) return res.status(400).json(err);
      res.status(200).json(comment)
    });
  })
})

router.patch('/projects/:pid/boards/:bid/comments/:cid', (req, res) => {
  Projects.findById(req.params.pid, (err, project) => {
    if (err) return res.status(404).json(err);

    const board = project.boards.id(req.params.bid);
    if (!board) return res.status(404).json(err);

    const comment = board.comments.id(req.params.cid);
    if (!comment) return res.status(404).json(err);

    const updatedComment = comment.set({
      ...req.body
    })

    project.save((err) => {
      if (err) return res.status(400).json(err);
      res.status(200).json(updatedComment)
    });
  })
})





module.exports = router;