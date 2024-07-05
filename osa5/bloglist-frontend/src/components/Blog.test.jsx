import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'Vitest',
    author: 'Tester',
    url: 'www.vitest.com',
    likes: 1,
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
    'Vitest'
  )
})

test('clicking the button reveals rest of the information', async () => {
  const blog = {
    title: 'Vitest author',
    author: 'Tester',
    url: 'www.vitest.com',
    likes: 1,
    user: {
      name: 'Testaaja',
      id:'öööö'
    }
  }

  const user = {
    name: 'Testaaja',
    id: 'öööö'
  }

  const mockHandler = vi.fn()

  render(<Blog blog={blog} user={user} toggleVisibility={mockHandler} />)

  const viUser = userEvent.setup()
  const button = screen.getByText('view')
  await viUser.click(button)
  expect(button).toBeDefined()
  const urlElement = screen.getByText('www.vitest.com')
  const likesElement = screen.getByText('likes 1')
  const userElement = screen.getByText('Testaaja')
})