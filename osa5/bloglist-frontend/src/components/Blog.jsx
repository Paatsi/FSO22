import { useState } from 'react'
import PropTypes from 'prop-types'


const Blog = ({ blog, addLikes, removeBlog, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLikes = () => {
    const blogObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
    }
    addLikes(blog.id, blogObject)
  }

  const handleRemove = () => {
    if(window.confirm(`remove blog ${blog.title} by ${blog.author}`)){
      removeBlog(blog.id)
    }

  }


  if (!visible) {
    return (
      <div style={blogStyle} className="blog">
        <div style={hideWhenVisible}>
          {blog.title} {blog.author}
          <button onClick={toggleVisibility}>view</button>
        </div>
      </div>
    )
  }
  else {
    return (
      <div style={blogStyle} className="blog">
        <div style={hideWhenVisible}>
          {blog.title} {blog.author}
          <button onClick={toggleVisibility}>view</button>
        </div>
        <div style={showWhenVisible}>
          {blog.title} {blog.author}
          <button onClick={toggleVisibility}>hide</button>
          <p>{blog.url}</p>
          <p>
            likes {blog.likes}
            <button onClick={handleLikes}>like</button>
          </p>
          <p>{blog.user.name}</p>
          {blog.user.id === user.id && <button onClick={handleRemove}>remove</button>}
        </div>
      </div>
    )
  }
}



Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  addLikes: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired
}

export default Blog