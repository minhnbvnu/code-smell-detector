function media_setVolume(volume) {
  return {
    type: SET_VOLUME,
    volume: clamp(volume, 0, 100)
  };
}