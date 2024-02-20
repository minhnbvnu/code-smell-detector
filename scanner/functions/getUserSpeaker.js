function getUserSpeaker (userSetting) {
  if (Config.ttsMode === 'vits-uma-genshin-honkai') {
    return convertSpeaker(userSetting.ttsRole || Config.defaultTTSRole)
  } else if (Config.ttsMode === 'azure') {
    return userSetting.ttsRoleAzure || Config.azureTTSSpeaker
  } else if (Config.ttsMode === 'voicevox') {
    return userSetting.ttsRoleVoiceVox || Config.voicevoxTTSSpeaker
  }
}