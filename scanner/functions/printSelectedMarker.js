function printSelectedMarker(index) {
    if (state === null) {
      return '';
    }

    return state.selectedElementIndex === index ? `→` : ' ';
  }