import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const user = userEvent.setup()
  const createBlog = vi.fn()

  render(<BlogForm createBlog={createBlog} />)

  const input = screen.getAllByRole('textbox')
  const createButton = screen.getByText('create')
  expect(createButton).toBeDefined()

  await user.type(input[0], 'Test Blog')
  await user.type(input[1], 'Tester')
  await user.type(input[2], 'www.testblog.com')
  await user.click(createButton)
  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Test Blog')
  expect(createBlog.mock.calls[0][0].author).toBe('Tester')
  expect(createBlog.mock.calls[0][0].url).toBe('www.testblog.com')
})