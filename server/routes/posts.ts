import express from 'express'

import * as db from '../db/db'

const router = express.Router()

// GET /v1/posts
router.get('/', async (req, res) => {
  try {
    const posts = await db.getAllPosts()
    if (!posts) {
      res.status(404).json({ message: 'Posts not found' })
      return
    }
    res.json(posts)
  } catch (err) {
    res.status(500).json({
      message: 'Something is wrong here, try again',
      error: err instanceof Error ? err.message : 'Unknown error',
    })
  }
})

// POST /v1/posts
router.post('/', async (req, res) => {
  try {
    const { title, text } = req.body
    const newBlog = { title, text }
    const newPost = await db.addPost(newBlog)

    if (!newPost) {
      res.status(404).json({ message: 'Blog not added' })
      return
    }
    res.status(201).json(newPost)
  } catch (err) {
    res.status(500).json({
      message: 'Something is wrong here, try again',
      error: err instanceof Error ? err.message : 'Unknown error',
    })
  }
})

router.patch('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    const { title, text } = req.body
    const newBlog = { title, text }
    const updatedBlog = await db.updatePostById(id, newBlog)
    if (!updatedBlog) {
      res.status(404).json({ message: 'Post not updated' })
      return
    }
    res.json(updatedBlog)
  } catch (err) {
    res.status(500).json({
      message: 'Something is wrong here, try again',
      error: err instanceof Error ? err.message : 'Unknown error',
    })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const postId = Number(req.params.id)
    if (!postId) {
      res.status(404).json({ message: 'id not found' })
      return
    }
    const posts = await db.deletePost(postId)
    console.log(posts)
    res.json(posts)
  } catch (err) {
    res.status(500).json({
      message: 'Something is wrong here, try again',
      error: err instanceof Error ? err.message : 'Unknown error',
    })
  }
})

// GET /v1/posts/:postId/comments
router.get('/:id/comments', async (req, res) => {
  try {
    const id = Number(req.params.id)

    const comments = await db.getCommentsById(id)
    if (!id) {
      res.status(404).json({ message: 'id not found' })
      return
    }
    res.json(comments)
  } catch (err) {
    res.status(500).json({
      message: 'Something is wrong here, try again',
      error: err instanceof Error ? err.message : 'Unknown error',
    })
  }
})

router.post('/:id/comments', async (req, res) => {
  try {
    const postId = Number(req.params.id)

    const comment = req.body.comment

    if (!postId) {
      res.status(404).json({ message: 'id not found' })
      return
    }
    const newComment = await db.addComments(postId, comment)

    res.status(201).json(newComment)
  } catch (err) {
    res.status(500).json({
      message: 'Something is wrong here, try again',
      error: err instanceof Error ? err.message : 'Unknown error',
    })
  }
})


export default router
