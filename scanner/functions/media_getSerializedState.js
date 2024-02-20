function media_getSerializedState(state) {
  const {
    volume,
    balance,
    shuffle,
    repeat
  } = state;
  return {
    volume,
    balance,
    shuffle,
    repeat
  };
}