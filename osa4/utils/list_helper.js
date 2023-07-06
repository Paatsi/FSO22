const lodash = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const likes = blogs.reduce((sum, blog) => {
    return sum + blog.likes
  }, 0)
  return likes
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null
  const likes = blogs.reduce((prev, curr) => {
    return (prev.likes > curr.likes) ? prev : curr
  }, 0)
  return {
    title: likes.title,
    author: likes.author,
    likes: likes.likes
  }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null
  const author = (lodash(blogs)
    .countBy('author')
    .entries()
    .maxBy(lodash.last))
  return {
    author: author[0],
    blogs: author[1]
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}