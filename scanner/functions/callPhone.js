function callPhone(phoneNum) {//拨打手机号码
  wx.makePhoneCall({
    phoneNumber: phoneNum + ''
  })
}