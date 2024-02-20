function mockStoreWithoutMiddleware() {
  return {
    getState() {
      return typeof getState === 'function' ? getState() : getState;
    },

    dispatch(action) {
      const expectedAction = expectedActions.shift();
      expect(action).toEqual(expectedAction);
      if (onLastAction && !expectedActions.length) {
        onLastAction();
      }
      return action;
    }
  };
}