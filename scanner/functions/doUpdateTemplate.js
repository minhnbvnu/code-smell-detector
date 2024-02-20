function doUpdateTemplate(state, action) {
  let newCurrent = state.current.set('template', action.template);

  // so that we don't create "working" document when users only change
  // templates on the home page (i.e. default content loaded)
  if (!state.current.isDefault()) {
    newCurrent = newCurrent.set('last_modified_locally', Date.now());
  }

  return {
    ...state,
    current: newCurrent,
    forceUpdate: false,
  };
}