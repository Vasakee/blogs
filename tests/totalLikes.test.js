const listHelper = require('../utils/listHelper')
const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go to Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/-rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes:5,
    _v:0
  }
]

test('when list has only one blog, equals the likes of that', async () => {
  const result = await listHelper.totalLikes(listWithOneBlog)
  expect(result).toBe(5)
})