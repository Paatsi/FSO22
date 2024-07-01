import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'Vitest author',
    user: {
      id:'öööö'
    }
  }

  const user = {
    name: 'Testaaja',
    id: 'öööö'
  }

  render(<Blog blog={blog} user={user} />)
  const element = screen.getByTestId('title')
  expect(element).toHaveTextContent(
    'Vitest author'
  )
})