const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes !== undefined ? request.body.likes : 0
  })

  if (blog.title === undefined || blog.url === undefined) {
    return response.status(400).json({ error: 'title or url missing' })
  }

  const result = await blog.save()
  response.status(201).json(result)
})

module.exports = blogsRouter