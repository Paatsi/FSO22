import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleAddBlog = async (event) => {
    event.preventDefault()

    createBlog({
      title: title,
      author: author,
      url: url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleAddBlog}>
            title:
        <input
          type='text'
          data-testid='title'
          value={title}
          name='Title'
          onChange={({ target }) => setTitle(target.value)}
        />
        <br/>
            author:
        <input
          type='text'
          data-testid='author'
          value={author}
          name='Author'
          onChange={({ target }) => setAuthor(target.value)}
        />
        <br/>
            url:
        <input
          type='text'
          data-testid='url'
          value={url}
          name='Url'
          onChange={({ target }) => setUrl(target.value)}
        />
        <br/>
        <button type='submit'>create</button>
      </form>
    </div>
  )}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm