function generateResponseContext () {
  const result = {}
  result.status = jest.fn().mockReturnValue(result)
  result.json = jest.fn().mockReturnValue(result)
  result.attachment = jest.fn().mockReturnValue(result)
  result.send = jest.fn().mockReturnValue(result)
  result.type = jest.fn().mockReturnValue(result)
  return result
}