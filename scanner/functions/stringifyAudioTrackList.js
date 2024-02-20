function stringifyAudioTrackList(audioTracks) {
  return audioTracks
    ?.map(stringifyAudioTrack)
    .join(' ');
}