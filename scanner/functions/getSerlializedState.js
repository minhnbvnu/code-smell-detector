function getSerlializedState(state) {
  return {
    version: 1,
    media: media_getSerializedState(state.media),
    equalizer: equalizer_getSerializedState(state.equalizer),
    display: display_getSerializedState(state.display),
    windows: getSerializedState(state.windows)
  };
}