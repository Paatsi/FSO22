import axios from 'axios'
//const baseUrl = '/api/blogs'

let token = null

const getAll = () => {
  const request = axios.get('http://localhost:3003/api/blogs')
  return request.then(response => response.data)
}

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

export default { getAll, setToken }