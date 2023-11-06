import { describe, it, expect, beforeAll, beforeEach, afterAll } from 'vitest'
import request from 'supertest'

import server from '../../server'
import connection from '../../db/connection'

beforeAll(async () => {
  await connection.migrate.latest()
})

beforeEach(async () => {
  await connection.seed.run()
})

afterAll(async () => {
  await connection.destroy()
})

describe('GET /api/v1/posts', ()=>{
  it('should return an array of posts', async()=>{
    const res = await request(server).get('/api/v1/posts')
    expect(res.body).toHaveLength(4)
  })
})

describe('GET /api/v1/posts/:id/comments',()=>{
  it('should return an array of comments', async()=>{
    const res = await request(server).get('/api/v1/posts/126/comments')
    expect(res.body).toHaveLength(0)
  })
})