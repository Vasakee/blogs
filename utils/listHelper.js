const _ = require('lodash')
const dummy = (blogs) => {
  return Number(blogs + 1)
}
const totalLikes = (blogs) => {
  if(!Array.isArray(blogs) || !blogs.length) return 0
  if(blogs.length === 1) return blogs[0].likes
  return blogs.reduce((total, blog) => total + blog.likes, 0)
}
const favouriteBlog = (blogs) => {
  if(blogs.length === 0) return {}
  return blogs.reduce((last_blog, current_blog) => {
    current_blog.likes > last_blog.likes ? current_blog : last_blog
  })
}
const mostChecks = (blog) => blog.author
const mostLikes = (blogs) => {
  if(blogs.length === 0) return {}
  const blogCluster = _.groupBy(blogs, mostChecks)
  const blogsByLikes = _.mapValues(blogCluster, totalLikes)
  const mostLiked = Object.entries(blogsByLikes).reduce((a,b) =>
    a[1] > b[1] ? a:b
  )
  return { author: mostLiked[0], likes: mostLiked[1] }
}
const mostBlogs = (blogs) => {
  if(blogs.length === 0) return {}
  const blogCluster = _.groupBy(blogs, mostChecks)
  const blogsByAuthor = _.mapValues(blogCluster, (e) => e.length)
  const mostBlog = Object.entries(blogsByAuthor).reduce((a,b) =>
  a[1] > b[1] ? a : b)
  return {author: mostBlog[0], blogs:mostBlog[1]}
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostLikes,
  mostBlogs
}