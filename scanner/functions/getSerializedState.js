function getSerializedState(state) {
  return {
    positionsAreRelative: state.positionsAreRelative,
    genWindows: objectMap(state.genWindows, w => {
      return {
        size: w.size,
        open: w.open,
        hidden: false,
        // Not used any more
        shade: w.shade || false,
        position: w.position
      };
    }),
    focused: state.focused
  };
}