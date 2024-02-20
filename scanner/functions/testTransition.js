function testTransition(states) {
  const navigationStates = states.map(keys => {
    return {
      children: keys.map(key => {
        return { key };
      }),
    };
  });

  let scenes = [];
  let prevState = null;
  navigationStates.forEach((nextState) => {
    scenes = NavigationScenesReducer(scenes, nextState, prevState);
    prevState = nextState;
  });

  return scenes;
}