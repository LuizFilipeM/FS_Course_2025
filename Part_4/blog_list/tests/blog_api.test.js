const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()

  blogObject = new Blog(helper.initialBlogs[2])
  await blogObject.save()
})


test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
},100000)

test('id property is defined', async () => {
  const response = await api.get('/api/blogs')
  const blogs = response.body

  blogs.forEach(blog => {
    expect(blog.id).toBeDefined()
  })
},100000)

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Test Blog',
    author: 'Test Author',
    url: 'https://testblog.com',
    likes: 5
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(n => n.title)
  expect(titles).toContain(
    'Test Blog'
  )
},100000)

test('number of likes defaults to 0', async () => {
  const newBlog = {
    title: 'Test Blog',
    author: 'Test Author',
    url: 'https://testblog.com'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  const blog = blogsAtEnd.find(b => b.title === 'Test Blog')
  expect(blog.likes).toBe(0)
},100000)

test('blog without title or url is not added', async () => {
  const newBlog = {
    author: 'Test Author',
    likes: 5
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

},100000)

test('a blog can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]
  console.log(blogToDelete.id)

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

  const titles = blogsAtEnd.map(r => r.title)
  expect(titles).not.toContain(blogToDelete.title)
},100000)

test('a blog can be updated', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]

  const updatedBlog = {
    title: 'Updated Blog',
    author: 'Updated Author',
    url: 'https://updatedblog.com',
    likes: 10
  }

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(updatedBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  const blog = blogsAtEnd.find(b => b.id === blogToUpdate.id)
  expect(blog.title).toBe('Updated Blog')
  expect(blog.author).toBe('Updated Author')
  expect(blog.url).toBe('https://updatedblog.com')
  expect(blog.likes).toBe(10)
},100000)

afterAll(async () => {
  await mongoose.connection.close()
})