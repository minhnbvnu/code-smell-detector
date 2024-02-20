function ModalDialog_dialogReducer(state, action) {
  switch (action.type) {
    case 'HIDE':
      return {
        dialogs: state.dialogs.filter(dialog => dialog.id !== action.id)
      };

    case 'SHOW':
      return {
        dialogs: [...state.dialogs, {
          canBeDismissed: action.canBeDismissed !== false,
          content: action.content,
          id: action.id,
          title: action.title || null
        }]
      };

    default:
      throw new Error(`Invalid action "${action.type}"`);
  }
}