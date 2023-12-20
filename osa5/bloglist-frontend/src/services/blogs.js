import axios from 'axios'
//const baseUrl = '/api/blogs'

let token = null

const getAll = () => {
  const request = axios.get('http://localhost:3003/api/blogs')
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post('http://localhost:3003/api/blogs', newObject, config)
  return response.data
}

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

export default { getAll, create, setToken }