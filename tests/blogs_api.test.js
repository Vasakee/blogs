const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const Helper = require('./test-helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(Helper.initialBlogs);
});

describe('when there is initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
    .get ('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  })
  
  //test('all blocks are returned as json', async () => {
    //const response = await api.get('/api/blogs')

  //  expect(response.body).toHaveLength(Helper.initialBlogs.length)
  //}) 
})

describe('addition of a new blog', () => {
  test('checking for a particular blog by id', async() => {
  const singleBlog = await Helper.blogsInDb()
  expect(singleBlog[0].id).toBeDefined()
  expect(singleBlog[0]._id).toBe(undefined);
  /*const blogs =  Blog.find({})
  expect(blogs[0]._id).toBeDefined() */                                                                                                                                                                         
})
test('A valid blog can be added', async () => {
    const newBlog = {
        title: 'Type wars',
        author: "Robert C. Martin",
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        likes: 2,
    }
    await api               
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
    const blogsAtEnd =  await Helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(Helper.initialBlogs.length + 1)
    const contents = blogsAtEnd.map(a => a.title)
    expect(contents).toContain( 'Type wars')
})
test('if the like is missing, it should default to 0', async () => {
  const newBlog = {
    title: 'Test an app',
    author: 'Jhon doe',
    url: 'https://fullstackopen.com/',
  }
  const response = await api 
  .post('/api/blogs')
  .send(newBlog)
  .expect(201)
    .expect('Content-Type', /application\/json/)
  
  expect(response.body.likes).toBeDefined()
  expect(response.body.likes).toBe(0)
})
  test('blog without url is not added', async () => {
    const newBlog = {
    author: 'Robert C. Martin',
    likes: 2
    }
    await api 
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    //.expect('Content-Type', /application\/json/)
    const blogsAtEnd = await Helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(Helper.initialBlogs.length)
  })
})
describe('deletion of a blog', () => {
  test('succeeds  with status code 204 if id is valid', async () => {
     
    const blogsAtStart = await Helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

     await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set("Authorization", `bearer ${loggedUser.body.token}`)
      .expect(204);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);
     
   }) 
 })

console.log(Helper.blogsInDb())

afterAll(async () => {
   await mongoose.connection.close()
})