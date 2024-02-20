function setTipSettingByType (type, show) {
  TIP_SETTINGS[type].show = show
  wx.setStorageSync('TIP_SETTINGS', TIP_SETTINGS)
}