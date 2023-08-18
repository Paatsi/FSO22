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

describe('addition of a new blog', () => {
  test('valid data & blog length is + 1', async () => {
    const newBlog = {
      title: 'Test Blog',
      author: 'Test Blogger',
      url: 'https://testblogger.com/',
      likes: 10
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const contents = blogsAtEnd.map(b => b.title)
    expect(contents).toContain('Test Blog')
  })

  test('if likes has no value, it is set to 0', async () => {
    const newBlog = {
      title: 'Test Blog with no likes value',
      author: 'Test Blogger',
      url: 'https://testblogger0.com/'
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const contents = blogsAtEnd.map(b => b.likes)
    expect(contents).toContain(0)

  })
})


afterAll(async () => {
  await mongoose.connection.close()
})
