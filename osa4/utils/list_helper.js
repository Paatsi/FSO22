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
  if (blogs.length === 0) return {}
  const likes = blogs.reduce((prev, curr) => {
    return (prev.likes > curr.likes) ? prev : curr
  }, 0)
  return likes
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}