import connection from './connection.ts'
import { Post, PostData } from '../../models/post.ts'
import { CommentData } from '../../models/comment.ts'

const db = connection

export function getAllPosts():Promise<Post[]> {
  return db('Posts').select('title', 'date_created as dateCreated', 'text', 'id')
}

export function addPost(newPost:PostData):Promise<Post[]> {
  const date_created = new Date(Date.now())
  return db('Posts').insert({...newPost, date_created}).returning('*')
}

export function updatePostById(id:number, newPost:PostData){
  return db('Posts').where('id', id).update(newPost)
}

export function getCommentsById(id :number){
return db('Comments').where('post_id', id).select('date_posted as datePosted', 'comment', 'id' , 'post_id as postId')

}

export function deletePost(id:number){
  return db('Posts').where('id', id).del()
}

export function addComments(postId:number, comment:string){
  const commentData = {
    post_id: postId,
    comment:comment,
    date_posted : new Date(Date.now())
  }
  // console.log(commentData)
return db('Comments').insert({...commentData}).returning('*')
}

export function updateComment(commentId :number, comment :string){
  return db('Comments').where('id', commentId).update(comment)

}

export function deleteComment(commentId:number){
  return db('Comments').where('id', commentId).del()
}