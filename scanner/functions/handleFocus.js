function handleFocus() {
    readyToSelect.current = true;

    if (!isSelected && index != null && !disabled) {
      dispatch({
        type: SELECT_ITEM_AT_INDEX,
        payload: {
          index: index
        }
      });
    }
  }