function requestWithModal (method, relativeUrl, param, header) {
  return request(method, relativeUrl, param, header).catch((res) => {
    let errMsg
    if (res.data && res.data.message) {
      errMsg = res.data.message
    } else {
      errMsg = res.statusCode ? '发生未知错误，请联系开发者' : res.errMsg
    }
    wx.showModal({
      content: errMsg,
      showCancel: false
    })
    return Promise.reject(res)
  })
}