async function getEmotionPrompt (e) {
  if (!Config.azureTTSEmotion) return ''
  let userReplySetting = await redis.get(`CHATGPT:USER:${e.sender.user_id}`)
  userReplySetting = !userReplySetting
    ? getDefaultReplySetting()
    : JSON.parse(userReplySetting)
  let emotionPrompt = ''
  let ttsRoleAzure = userReplySetting.ttsRoleAzure
  const configuration = Config.ttsMode === 'azure' ? supportConfigurations.find(config => config.code === ttsRoleAzure) : ''
  if (configuration !== '' && configuration?.emotion) {
    // 0-1 感觉没啥区别，说实话只有1和2听得出差别。。
    emotionPrompt = `\n在回复的最开始使用[]在其中表示你这次回复的情绪风格和程度(1-2)，最小单位0.1
                               \n例如：['angry',2]表示你极度愤怒
                               \n这是情绪参考值，禁止使用给出范围以外的词，且单次回复只需要给出一个情绪表示
                               \n${JSON.stringify(configuration.emotion)}
                               \n另外，不要在情绪[]前后使用回车换行，如果你明白上面的设定，请回复’好的，我明白了‘并在后续的对话中严格执行此设定。`
    // logger.warn('emotionPrompt:', `${JSON.stringify(configuration.emotion)}`)
  } else {
    return ''
  }
  return emotionPrompt
}