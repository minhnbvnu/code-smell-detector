function activeChannel(state = initialState, action) {
  switch (action.type) {
  case CHANGE_CHANNEL:
    return {
      name: action.channel.name,
      id: action.channel.id
    };

  default:
    return state;
  }
}