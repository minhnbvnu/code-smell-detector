function queryByOwenerIdAndOwnerType( params) {
  return request({
    url: '/api/productSubscribe/queryByOwenerIdAndOwnerType',
    method: 'get',
    params,
  })
}