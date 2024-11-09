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

      test('only the user who added the blog is able to see the remove button', async ({ page, request }) => {
        const blog = page.locator('.blog').filter({ hasText: 'Test Blog2' })
        await blog.getByRole('button', { name: 'view' }).click()
        await expect(blog.getByRole('button', { name: 'remove' })).toBeVisible()
        
        await request.post('http://localhost:3003/api/users', {
          data: {
            username: 'other user',
            name: 'dummy',
            password: 'password',
          }
        })
        await page.getByRole('button', { name: 'logout' }).click()
        await loginWith(page, 'other user', 'password')
        await blog.getByRole('button', { name: 'view' }).click()
        await expect(blog.getByRole('button', { name: 'remove' })).not.toBeVisible()
      })

      test('the blogs are in descending order determined by likes', async ({ page }) => {
        const blog2 = page.locator('.blog').filter({ hasText: 'Test Blog2' })
        const blog1 = page.locator('.blog').filter({ hasText: 'Test Blog1' })
        const blog3 = page.locator('.blog').filter({ hasText: 'Test Blog3' })

        await blog1.getByRole('button', { name: 'view' }).click()
        await blog2.getByRole('button', { name: 'view' }).click()
        await blog3.getByRole('button', { name: 'view' }).click()

        await blog2.getByRole('button', { name: 'like' }).click()
        await expect(blog2.locator("[data-testid='likes']")).toHaveText('1')
        await blog2.getByRole('button', { name: 'like' }).click()
        await expect(blog2.locator("[data-testid='likes']")).toHaveText('2')
        await blog3.getByRole('button', { name: 'like' }).click()
        await expect(blog3.locator("[data-testid='likes']")).toHaveText('1')

        const blogs = page.locator('.blog')
        await expect(blogs.first()).toContainText('Test Blog2')
        await expect(blogs.nth(1)).toContainText('Test Blog3')
        await expect(blogs.last()).toContainText('Test Blog1')
      })
    })
  })
})