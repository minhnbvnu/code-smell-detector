function refreshToken (response) {
  if (response.data.header) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.header.token}`
    localStorage.setItem('token', response.data.header.token)
  }
  return response
}