function checkStatus (response) {
  const languageText = localStorage.getItem('preferredLanguage')
  const textRepeat = languageText === 'en'
    ? 'ServerException! Please try again later!'
    : '服务器异常，请稍后重试！'
  const text401 = languageText === 'en'
    ? 'Not login or session expired. Please login again!'
    : '未登录或会话过期，请重新登录！'
  const text403 = languageText === 'en'
    ? 'User Type Error!'
    : '用户类型错误！'
  switch (response.data.code) {
    case 401:
      message.error(text401, 3)
      delete axios.defaults.headers.common['Authorization']
      localStorage.removeItem('token')
      break
    case 403:
      message.error(text403, 3)
      break
    case 451:
      message.error(textRepeat, 3)
      break
    case 500:
      message.error(textRepeat, 3)
      break
    case 503:
      message.error(textRepeat, 3)
      break
    case 504:
      message.error(textRepeat, 3)
      break
    default:
      break
  }
  return response
}