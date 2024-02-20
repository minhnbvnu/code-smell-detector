function incrementIfOdd() {
  return (dispatch, getState) => {
    const {counter} = getState();

    if (counter % 2 === 0) {
      return;
    }

    dispatch(increment());
  };
}