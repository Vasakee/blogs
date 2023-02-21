const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (_request,response) => {
   const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
   response.json(blogs.map((blog) => blog.toJSON()))
})

blogsRouter.get('/:id', async(request, response, next) => {
  Blog.findById(request.params.id)
    .then(blogs => {
      if(blogs){
        response.json(blogs)
      }else{
        response.status(404).end()
      }
    })
    .catch(err => next(err))
})

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

blogsRouter.post('/', async(request, response, next) => {
  const body = request.body
  
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({error: 'token invalid'})
  }

  const user = await User.findById(decodedToken.id)
  //console.log(user)

  const blog = new Blog({
    title:body.title,
    author:body.author,
    url:body.url,
    likes:body.likes,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  blog.save()
    .then(savedBlog => {
      response.status(201).json(savedBlog)
    })
    .catch(err => next(err))
})
blogsRouter.delete('/:id', (request, response, next) => {
  Blog.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(err => next(err))
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body
  const blog = {
    title:body.title,
    author:body.author,
    url:body.url,
    likes: body.likes
  }
   await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then(updatedblog => {
      response.json(updatedblog)
    })
    .catch(err => next(err))
})

module.exports = blogsRouter