import { useState } from 'react'
import { deleteComment } from '../api'
import CommentForm from './CommentForm'
import { IComment } from '../IComment'
import { IFetchComments } from './hooks/useFetchComments'

interface IProps {
  comment: IComment
  fetchComments: IFetchComments
}

function Comment({ comment, fetchComments }: IProps) {
  const [editing, setEditing] = useState(false)

  return editing ? (
    <CommentForm
      commentId={comment.id}
      comment={comment.comment}
      setEditing={setEditing}
      variant="edit"
      fetchComments={fetchComments}
    />
  ) : (
    <div className="comment" key={comment.id}>
      <p>
        <span className="comment-content">{comment.comment}</span>
        <span className="comment-date">
          Date Posted: {new Date(comment.datePosted).toDateString()}
        </span>

        <button
          className="pure-button button-secondary"
          onClick={() => setEditing(true)}
        >
          Edit
        </button>

        <button
          className="pure-button button-error"
          onClick={(e) => {
            console.log('delete comment', comment.id)
            e.preventDefault()

            return deleteComment(comment.id).then(() => {
              fetchComments(comment.postId)
            })
          }}
        >
          Delete
        </button>
      </p>
    </div>
  )
}

export default Comment
