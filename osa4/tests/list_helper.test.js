const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []
  expect(listHelper.dummy(blogs)).toBe(1)
})

const singleBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]

const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Edsger W. Dijkstra',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
]

const multipleFavouriteBlogs = [
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 12,
    __v: 0
  }
]

describe('total likes', () => {
  test('empty list', () => {
    expect(listHelper.totalLikes([])).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    expect(listHelper.totalLikes(singleBlog)).toBe(5)
  })

  test('returns sum of likes when >1 blogs', () => {
    expect(listHelper.totalLikes(blogs)).toBe(36)
  })
})

describe('most likes', () => {

  test('empty list, returns null', () => {
    expect(listHelper.favoriteBlog([])).toEqual(null)
  })

  test('single blog', () => {
    expect(listHelper.favoriteBlog(singleBlog)).toEqual({
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5
    })
  })

  test('multiple blogs', () => {
    expect(listHelper.favoriteBlog(blogs)).toEqual({
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12
    })
  })

  test('multiple blogs with 2 favorites, returns the last occurrence', () => {
    expect(listHelper.favoriteBlog(multipleFavouriteBlogs)).toEqual({
      title: 'Type wars',
      author: 'Robert C. Martin',
      likes: 12
    })
  })
})

describe('author with most blogs', () => {
  test('empty list', () => {
    expect(listHelper.mostBlogs([])).toEqual(null)
  })
  test('single blog', () => {
    expect(listHelper.mostBlogs(singleBlog)).toEqual({
      author: 'Edsger W. Dijkstra',
      blogs: 1
    })
  })
  test('multiple blogs', () => {
    expect(listHelper.mostBlogs(blogs)).toEqual({
      author: 'Edsger W. Dijkstra',
      blogs: 3
    })
  })
  test('multiple authors with same amount of blogs', () => {
    expect(listHelper.mostBlogs(multipleFavouriteBlogs)).toEqual({
      author: 'Robert C. Martin',
      blogs: 2
    })
  })
})

describe('author with most likes', () => {
  test('empty list', () => {
    expect(listHelper.mostLikes([])).toEqual(null)
  })
  test('single blog', () => {
    expect(listHelper.mostLikes(singleBlog)).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 5
    })
  })
  test('multiple blogs', () => {
    expect(listHelper.mostLikes(blogs)).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 27
    })
  })
  test('multiple authors with same amount of likes', () => {
    expect(listHelper.mostLikes(multipleFavouriteBlogs)).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 22
    })
  })
})