import { describe, it, expect, vi } from 'vitest'
import request from 'supertest'

import server from '../../server'
import * as db from '../../db/db'

vi.mock('../../db/db')

describe('GET /api/v1/posts/:id/comments', ()=>{
  it('should return an array of comments', async()=>{
    vi.mocked(db.getCommentsById).mockResolvedValue([
      {
        "datePosted": 1699221840046,
        "comment": "Great blog",
        "id": 1,
        "postId": 123
      }
    ])
    const res = await request(server).get('/api/v1/posts/123/comments')
    expect(res.statusCode).toBe(200)
    expect(res.body).toMatchInlineSnapshot(`
      [
        {
          "comment": "Great blog",
          "datePosted": 1699221840046,
          "id": 1,
          "postId": 123,
        },
      ]
    `)
  })

  it('should return an error message when the db falis', async()=>{
    vi.mocked(db.getCommentsById).mockRejectedValue(new Error('Unknown error'))
    vi.spyOn(console, 'error').mockImplementation(()=>{})
  
      const res = await request(server).get('/api/v1/posts/123/comments')
  
      expect(res.body.error).toBe('Unknown error')
      expect(res.statusCode).toBe(500)
  })

})