const listHelper = require('../utils/listHelper')

const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Micheal Chan',
    url: 'https://reactpatterns.com',
    likes: 7,
    _v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go to Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/-rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes:5,
    _v:0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    _v: 0
  },
  {
    id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03TDD-Harms-Architecture.html',
    likes: 10,
    _v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 0,
    _v: 0
  },
  {
    id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    _v: 0
  }
]
describe('most blogs', () => {
    test('of empty list is zero', () => {
    const blogs = []
    expect(listHelper.mostBlogs(blogs)).toEqual({})
})
test('when list has only one blog', () => {
    expect(listHelper.mostBlogs(blogs.slice(0, 1))).toEqual({
        author: 'Micheal Chan',
        blogs: 1
    })
})
test('of list a big list of blogs', () => {
    expect(listHelper.mostBlogs(blogs)).toEqual({
        author: 'Robert C. Martin',
        blogs: 3
    })
  })
})