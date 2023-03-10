const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        _id: '5a422a851b54a676234d17f7',
        title: 'React patterns',
        author: 'Micheal Chan',
        url: 'https://reactpatterns.com',
        likes: 7
      },
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go to Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/-rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes:5
      }
]

const nonExistingId = async () => {
  const blog = new Blog({
    title: "willremovethissoon",
    author: "Jhon Doe",
    url: "https://fullstackopen.com/",
    likes: 4,
  });

  await blog.save();
  await blog.remove();

  return blog._id.toString();
};

const blogsInDb =  async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}
const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}
module.exports = {
  nonExistingId,
  initialBlogs,
  blogsInDb,
  usersInDb
}