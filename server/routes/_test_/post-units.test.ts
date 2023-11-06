import { describe, it, expect, vi } from 'vitest'
import request from 'supertest'

import server from '../../server'
import * as db from '../../db/db'

vi.mock('../../db/db')

describe('/GET/api/v1/posts', ()=>{
  it('should return an array of posts', async()=>{
    vi.mocked(db.getAllPosts).mockResolvedValue([{
      "title": "new blog",
      "dateCreated": 1699250579370,
      "text": "vbv blog",
      "id": 137
    }])
    const res = await request(server).get('/api/v1/posts')
    expect(res.statusCode).toBe(200)
    expect(res.body).toMatchInlineSnapshot(`
      [
        {
          "dateCreated": 1699250579370,
          "id": 137,
          "text": "vbv blog",
          "title": "new blog",
        },
      ]
    `)
  })

  it('should return an error message when the db fails', async()=>{
    vi.mocked(db.getAllPosts).mockRejectedValue(
      new Error('Unknown error')
    )

    vi.spyOn(console, 'error').mockImplementation(()=>{})

    const res = await request(server).get('/api/v1/posts')

    expect(res.body.error).toBe('Unknown error')
    expect(res.statusCode).toBe(500)
  })
})

