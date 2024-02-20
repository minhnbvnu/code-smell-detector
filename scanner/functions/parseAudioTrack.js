function parseAudioTrack(audioTrack) {
  if (audioTrack) {
    const [id, kind, language, label] = audioTrack.split(':');
    return { id, kind, language, label };
  }
}