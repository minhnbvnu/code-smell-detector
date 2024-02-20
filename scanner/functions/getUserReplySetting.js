async function getUserReplySetting (e) {
  let userSetting = await redis.get(`CHATGPT:USER:${e.sender.user_id}`)
  if (userSetting) {
    userSetting = JSON.parse(userSetting)
    if (Object.keys(userSetting).indexOf('useTTS') < 0) {
      userSetting.useTTS = Config.defaultUseTTS
    }
  } else {
    userSetting = getDefaultReplySetting()
  }
  return userSetting
}