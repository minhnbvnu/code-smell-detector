function resizeReducer(state, action) {
  switch (action.type) {
    case 'ACTION_SET_IS_RESIZING':
      return { ...state,
        isResizing: action.payload
      };

    case 'ACTION_SET_HORIZONTAL_PERCENTAGE':
      return { ...state,
        horizontalPercentage: action.payload
      };

    case 'ACTION_SET_VERTICAL_PERCENTAGE':
      return { ...state,
        verticalPercentage: action.payload
      };

    default:
      return state;
  }
}