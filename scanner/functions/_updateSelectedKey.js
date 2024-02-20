function _updateSelectedKey(target, state, navigatorUID) {
  const newNavigatorState = { ...state.navigators[navigatorUID] };
  const selected = newNavigatorState.routes[newNavigatorState.index];

  if (target.key === selected.key) {
    // haven't changed sections
    return state;
  }

  let targetIndex = NavigationStateUtils.indexOf(newNavigatorState, target.key);
  if (targetIndex !== -1) {
    const old = newNavigatorState.routes[targetIndex];
    newNavigatorState.routes.splice(targetIndex, 1);
    newNavigatorState.routes.push(old);
  } else {
    newNavigatorState.routes.push(target);
  }

  newNavigatorState.index = newNavigatorState.routes.length - 1;

  return {
    ..._updateNavigator(state, navigatorUID, newNavigatorState),
    currentNavigatorUID: navigatorUID,
  };
}