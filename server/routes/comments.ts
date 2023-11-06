import express from 'express'
import * as db from '../db/db'

// eslint-disable-next-line no-unused-vars

const router = express.Router()

router.patch('/:commentId', async(req,res)=>{
  try{

    const commentId = Number(req.params.commentId) 
    const comment = req.body
   
   const newComment = await db.updateComment(commentId,comment)
   if(!newComment){
    res.status(404).json({ message: 'Comment not updated' })
      return
   }
   
   res.json(newComment)
  }catch (err) {
    res.status(500).json({
      message: 'Something is wrong here, try again',
      error: err instanceof Error ? err.message : 'Unknown error',
    })
  }

})

router.delete('/:commentId', async(req,res)=>{
  const commentId = Number(req.params.commentId)
  const comments = await db.deleteComment(commentId)
  res.json(comments)
})

export default router
