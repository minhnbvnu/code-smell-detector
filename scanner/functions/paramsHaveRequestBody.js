function paramsHaveRequestBody (params) {
  return (
    params.body ||
    params.requestBodyStream ||
    (params.json && typeof params.json !== 'boolean') ||
    params.multipart
  )
}