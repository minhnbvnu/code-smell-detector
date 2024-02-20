function workbenchReducer (state = initialState, { type, payload }) {
  switch (type) {
    case LOAD_SOURCE_NAMESPACES:
      return state.set('error', false)
    case LOAD_SOURCE_NAMESPACES_SUCCESS:
      return state.set('sourceNamespaces', payload.sourceNamespaces)
    case CHANGE_TABS:
      return state.set('activeKey', payload.key)
    default:
      return state
  }
}