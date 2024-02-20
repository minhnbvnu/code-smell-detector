function stringifyAudioTrack(audioTrack) {
  if (audioTrack) {
    const { id, kind, language, label } = audioTrack;
    return [id, kind, language, label].filter(a => a != null).join(':')
  }
}