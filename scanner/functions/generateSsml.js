async function generateSsml (pendingText, option = {}) {
  let speaker = option?.speaker || '随机'
  let emotionDegree, role, emotion
  // 打招呼用
  if (speaker === '随机') {
    role = supportConfigurations[Math.floor(Math.random() * supportConfigurations.length)]
    speaker = role.code
    if (role?.emotion) {
      const keys = Object.keys(role.emotion)
      emotion = keys[Math.floor(Math.random() * keys.length)]
    }
    logger.info('using speaker: ' + speaker)
    logger.info('using emotion: ' + emotion)
    emotionDegree = 2
  } else {
    emotion = option.emotion
    emotionDegree = option.emotionDegree
  }
  const expressAs = emotion !== undefined ? `<mstts:express-as style="${emotion}" styledegree="${emotionDegree || 1}">` : ''
  return `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis"
    xmlns:mstts="https://www.w3.org/2001/mstts" xml:lang="zh-CN">
    <voice name="${speaker}">
        ${expressAs}${pendingText}${expressAs ? '</mstts:express-as>' : ''}
    </voice>
  </speak>`
}