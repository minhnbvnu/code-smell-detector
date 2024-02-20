function isMaybeDefaultImport(state) {
  return (state.type === types$1.name || !!state.type.keyword) && state.value !== "from";
}