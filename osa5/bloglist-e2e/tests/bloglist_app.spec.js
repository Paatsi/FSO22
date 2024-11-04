const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        username: "Testi",
        name: 'Testi',
        password: "password"
      }
    })

    await page.goto('/')
  })

  test('login form is shown', async ({ page }) => {
    await expect(page.getByText('Log in to application')).toBeVisible()
    await expect(page.getByText('username')).toBeVisible()
    await expect(page.getByText('password')).toBeVisible()
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()

  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'Testi', 'password')
      await expect(page.getByText('Testi logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'ö', 'ö')
      await page.getByRole('button', { name: 'login' }).click()

      const errorDiv = await page.locator('.error')
      await expect(errorDiv).toContainText('invalid username or password')
      await expect(errorDiv).toHaveCSS('border-style', 'solid')
      await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')
      await expect(page.getByText('Test User logged in')).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'Testi', 'password')
    })
  
    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'Test Blog1', 'Tester', 'http://localhost/5173')
      await expect(page.getByText('Test Blog1 Tester')).toBeVisible()
      await expect(page.getByRole('button', { name: 'create new blog' })).toBeVisible()
    })

    test('a blog can be liked', async ({ page }) => {
      await createBlog(page, 'Test Blog1', 'Tester', 'http://localhost/5173')
      await page.getByRole('button', { name: 'view' }).click()
      await expect(page.getByText('likes 0')).toBeVisible()
      await page.getByRole('button', { name: 'like' }).click()
      await expect(page.getByText('likes 1')).toBeVisible()
    })

    describe('Multiple blogs can be added and edited', () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, 'Test Blog1', 'Tester', 'http://localhost/5173')
        await createBlog(page, 'Test Blog2', 'Tester', 'http://localhost/5173')
        await createBlog(page, 'Test Blog3', 'Tester', 'http://localhost/5173')
      })
  
      test('the user who added the blog is able to delete it', async ({ page }) => {
        const blog = page.locator('.blog').filter({ hasText: 'Test Blog2' })
        await blog.getByRole('button', { name: 'view' }).click()
        await expect(blog.getByRole('button', { name: 'remove' })).toBeVisible()

        page.on('dialog', async (dialog) => {
          await dialog.accept()
        })
        await page.getByRole('button', { name: 'remove' }).click()
        await expect(blog).not.toBeVisible()
      })
    })
  })
})