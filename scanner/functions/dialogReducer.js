function dialogReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_OWNER_ID':
      const selectedIndex = action.owners.findIndex(owner => owner.id === action.ownerID);
      return {
        ownerID: action.ownerID,
        owners: action.owners,
        selectedIndex
      };

    case 'UPDATE_SELECTED_INDEX':
      return { ...state,
        selectedIndex: action.selectedIndex
      };

    default:
      throw new Error(`Invalid action "${action.type}"`);
  }
}