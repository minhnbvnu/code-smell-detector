function parseAudioTrackList(audioTracks) {
  return audioTracks
    ?.split(/\s+/)
    .map(parseAudioTrack);
}