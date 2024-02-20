function autoLogin () {
  UID = wx.getStorageSync(UID_KEY)
  TOKEN = wx.getStorageSync(TOKEN_KEY)
}