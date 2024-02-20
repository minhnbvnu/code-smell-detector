function getDefaultReplySetting () {
  return {
    usePicture: Config.defaultUsePicture,
    useTTS: Config.defaultUseTTS,
    ttsRole: Config.defaultTTSRole,
    ttsRoleAzure: Config.azureTTSSpeaker,
    ttsRoleVoiceVox: Config.voicevoxTTSSpeaker
  }
}