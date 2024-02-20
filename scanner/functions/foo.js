function foo () {
  const error = new HttpException('Some weird error')
  error.status = 503
  throw error
}