function setTipSettings (obj) {
  TIP_SETTINGS = obj
  wx.setStorageSync('TIP_SETTINGS', TIP_SETTINGS)
}