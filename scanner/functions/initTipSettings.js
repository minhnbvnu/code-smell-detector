function initTipSettings () {
  let tmp = wx.getStorageSync('TIP_SETTINGS')
  if (tmp) {
    setTipSettings(tmp)
  }
}