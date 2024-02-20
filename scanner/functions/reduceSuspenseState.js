function reduceSuspenseState(store, state, action) {
  const {
    type
  } = action;

  switch (type) {
    case 'UPDATE_INSPECTED_ELEMENT_ID':
      if (state.inspectedElementID !== state.selectedElementID) {
        return { ...state,
          inspectedElementID: state.selectedElementID
        };
      }

      break;

    default:
      break;
  } // React can bailout of no-op updates.


  return state;
}