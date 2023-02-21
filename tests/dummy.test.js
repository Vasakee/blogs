const ListHelper = require('../utils/listHelper')

test('dummy returns one',  () => {
  const blogs = []

  const result =  ListHelper.dummy(blogs)
  expect(result).toBe(1)
})