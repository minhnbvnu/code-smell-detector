function generateToken (ucid, account, nickname) {
  let loginAt = dateFns.getUnixTime(new Date())
  let user = JSON.stringify({
    ucid,
    nickname,
    account,
    loginAt
  })
  // 利用checksum和loginAt避免登录信息被篡改
  let checksum = generateChecksum(user)
  let infoJson = JSON.stringify({
    user,
    checksum
  })
  let info = encodeBase64(infoJson)
  return info
}