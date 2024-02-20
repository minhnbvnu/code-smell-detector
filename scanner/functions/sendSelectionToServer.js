function sendSelectionToServer(selection) {
  return {
    type: SEND_SELECTION_TO_SERVER,
    meta: {
      event: {
        type:     'search',
        payload:  selection.toJS()
      }
    }
  }
}