const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)



beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('tests for initial blogs in the DB', () => {
  test('correct amount of blogs are returned, 2', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('check that blogs are in JSON', async () => {
    await api
      .get('/api/blogs')
      .expect('Content-Type', /application\/json/)
  })

  test('blogs have "id" property instead of "_id"', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach((blog) => expect(blog.id).toBeDefined())

  })
})


afterAll(async () => {
  await mongoose.connection.close()
})
