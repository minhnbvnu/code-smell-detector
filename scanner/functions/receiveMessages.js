function receiveMessages(json, channel) {
  const date = moment().format('lll');
  return {
    type: types.LOAD_MESSAGES_SUCCESS,
    json,
    channel,
    date
  }
}