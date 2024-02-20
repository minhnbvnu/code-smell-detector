function setObjectState(objectStates, {stateName, id, value}) {
  const state = {...objectStates[stateName]};

  const xvizObject = XVIZObject.get(id);
  if (xvizObject) {
    xvizObject._setState(stateName, value);
  }

  if (value) {
    state[id] = value;
  } else {
    delete state[id];
  }

  return {
    ...objectStates,
    [stateName]: state
  };
}