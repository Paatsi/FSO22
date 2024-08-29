const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')
const Blog = require('../models/blog')
const User = require('../models/user')


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
  let token = null
  beforeAll(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('password', 10)
    const user = await new User({ username:'tester', passwordHash }).save()
    const userForToken = { username: user.username, id: user.id }
    return (token = jwt.sign(userForToken, config.SECRET))
  })

  test('valid data & blog length is + 1', async () => {
    const newBlog = {
      title: 'Test Blog',
      author: 'Test Blogger',
      url: 'https://testblogger.com/',
      likes: 10
    }
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).toContain('Test Blog')
  })

  test('if likes has no value, it is set to 0', async () => {
    const newBlog = {
      title: 'Test Blog with no likes value',
      author: 'Test Blogger',
      url: 'https://testblogger0.com/'
    }
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const likes = blogsAtEnd.map(b => b.likes)
    expect(likes).toContain(0)
  })

  test('blog without title or url will return status code 400', async () => {
    const newBlog = {
      author: 'Test Blogger',
      likes: 10
    }
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('request without token will return status code 401', async () => {
    const newBlog = {
      title: 'Test Blog',
      author: 'Test Blogger',
      url: 'https://testblogger.com/',
      likes: 10
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})

describe('blog deletion', () => {
  test('status code 204 if valid id and deletion succeeds', async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('password', 10)
    const user = await new User({ username:'tester', passwordHash }).save()
    const userForToken = { username: user.username, id: user.id }
    const token = jwt.sign(userForToken, config.SECRET)

    const blog = {
      title: 'blog to be deleted',
      author: 'tester',
      url: 'https://www.blogtobedeleted.com',
      likes: 0
    }
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(blog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[2]
    console.log(blogToDelete)

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await Blog.find({}).populate('user')
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)

    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).not.toContain(blogToDelete.title)
  })
})

describe('blog update', () => {
  test('update a blog with new data', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const newData = {
      likes: 100
    }

    const updatedBlog = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(newData)
      .expect(200)

    expect(updatedBlog.body.likes).toBe(newData.likes)
  })
})


afterAll(async () => {
  await mongoose.connection.close()
})