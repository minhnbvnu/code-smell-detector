function isLogin (showModal = false) {
  if (UID) {
    return true
  } else {
    if (showModal) {
      wx.showModal({
        title: '您还未登录',
        content: '登录后才可使用完整功能，是否前去登录？',
        success: res => {
          if (res.confirm) {
            wx.navigateTo({ url: '/pages/register/register?need_return=true' })
          }
        }
      })
    }
    return false
  }
}