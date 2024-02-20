function getRoles() {
  return request({
    url: '/vue-element-admin/roles',
    method: 'get'
  })
}