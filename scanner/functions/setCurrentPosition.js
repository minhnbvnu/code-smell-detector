function setCurrentPosition(position) {
  var oldPos = deepCopy(CURRENT_POSITION);
  var newPos = deepCopy(position);
  var oldFen = objToFen(oldPos);
  var newFen = objToFen(newPos);

  // do nothing if no change in position
  if (oldFen === newFen) return;

  // run their onChange function
  if (cfg.hasOwnProperty('onChange') === true &&
    typeof cfg.onChange === 'function') {
    cfg.onChange(oldPos, newPos);
  }

  // update state
  CURRENT_POSITION = position;
}