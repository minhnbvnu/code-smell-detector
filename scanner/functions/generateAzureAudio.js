async function generateAzureAudio (pendingText, role = '随机', speakingEmotion, emotionDegree = 1, ignoreEncode = false) {
  if (!Config.azureTTSKey) return false
  let speaker
  try {
    if (role !== '随机') {
      // 判断传入的是不是code
      if (azureRoleList.find(s => s.code === role.trim())) {
        speaker = role
      } else {
        speaker = azureRoleList.find(s => s.roleInfo.includes(role.trim()))
        if (!speaker) {
          logger.warn('找不到名为' + role + '的发言人,将使用默认发言人 晓晓 发送音频.')
          speaker = 'zh-CN-XiaoxiaoNeural'
        } else {
          speaker = speaker.code
        }
      }
      let languagePrefix = azureRoleList.find(config => config.code === speaker).languageDetail.charAt(0)
      languagePrefix = languagePrefix.startsWith('E') ? '英' : languagePrefix
      pendingText = (await translate(pendingText, languagePrefix)).replace('\n', '')
    } else {
      let role, languagePrefix
      role = azureRoleList[Math.floor(Math.random() * azureRoleList.length)]
      speaker = role.code
      languagePrefix = role.languageDetail.charAt(0).startsWith('E') ? '英' : role.languageDetail.charAt(0)
      pendingText = (await translate(pendingText, languagePrefix)).replace('\n', '')
      if (role?.emotion) {
        const keys = Object.keys(role.emotion)
        speakingEmotion = keys[Math.floor(Math.random() * keys.length)]
      }
      emotionDegree = 2
      logger.info('using speaker: ' + speaker)
      logger.info('using language: ' + languagePrefix)
      logger.info('using emotion: ' + speakingEmotion)
    }
    let ssml = AzureTTS.generateSsml(pendingText, {
      speaker,
      emotion: speakingEmotion,
      pendingText,
      emotionDegree
    })
    let record = await AzureTTS.generateAudio(pendingText, {
      speaker
    }, await ssml)
    return await uploadRecord(
      record
      , Config.ttsMode,
      ignoreEncode
    )
  } catch (err) {
    logger.error(err)
    return false
  }
}