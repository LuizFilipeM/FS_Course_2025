const Blog = require('../models/blog')
const User = require('../models/user')

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

const initialBlogs = [
  {
    title: 'Test Blog 1',
    author: 'Test Author 1',
    url: 'https://testblog1.com',
    likes: 5,
    idUser:['6ab7c4ea72772b045776d58e']
  },
  {
    title: 'Test Blog 2',
    author: 'Test Author 2',
    url: 'https://testblog2.com',
    likes: 10,
    idUser:['6ab7c4ea72772b045776d58e']
  },
  {
    title: 'Test Blog 3',
    author: 'Test Author 3',
    url: 'https://testblog3.com',
    likes: 15,
    idUser:['6ab7c4ea72772b045776d58f']
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon' })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb,
}