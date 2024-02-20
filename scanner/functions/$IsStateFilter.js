function $IsStateFilter($state) {
  var isFilter = function (state) {
    return $state.is(state);
  };
  isFilter.$stateful = true;
  return isFilter;
}