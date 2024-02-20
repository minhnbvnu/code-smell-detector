function showTip (type) {
  if (TIP_SETTINGS[type].show) {
    return Promisify(wx.showModal)({
      title: '帮助',
      content: TIP_SETTINGS[type].message,
      cancelText: '关闭',
      confirmText: '不再显示'
    }).then(res => {
      if (res.confirm) {
        setTipSettingByType(type, false)
      }
    })
  } else {
    return Promise.resolve()
  }
}