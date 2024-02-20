function instanceReducer (state = initialState, { type, payload }) {
  const instances = state.get('instances')

  switch (type) {
    case LOAD_INSTANCES:
      return state.set('error', false)
    case LOAD_INSTANCES_SUCCESS:
      return state.set('instances', payload.instances)
    case ADD_INSTANCE:
      return state
        .set('error', false)
        .set('modalLoading', true)
    case ADD_INSTANCE_SUCCESS:
      instances.unshift(payload.result)
      return state
        .set('instances', instances.slice())
        .set('modalLoading', false)
    case ADD_INSTANCE_ERROR:
      return state.set('modalLoading', false)
    case LOAD_SINGLE_INSTANCE:
      return state.set('error', false)
    case LOAD_SINGLE_INSTANCE_SUCCESS:
      return state
    case EDIT_INSTANCE:
      return state
        .set('error', false)
        .set('modalLoading', true)
    case EDIT_INSTANCE_SUCCESS:
      const startIndex = instances.indexOf(instances.find(p => Object.is(p.id, payload.result.id)))
      instances.fill(payload.result, startIndex, startIndex + 1)
      return state
        .set('instances', instances.slice())
        .set('modalLoading', false)
    case EDIT_INSTANCE_ERROR:
      return state.set('modalLoading', false)
    case DELETE_INSTANCE:
      return state
    case DELETE_INSTANCE_SUCCESS:
      return state.set('instances', instances.filter(g => !Object.is(g.id, payload.result)))
    case DELETE_INSTANCE_ERROR:
      return state
    case GET_ERROR:
      return state.set('error', payload.error)
    default:
      return state
  }
}