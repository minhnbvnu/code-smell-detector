function ssReset(newStates, $stateProvider) {
  resetTransitionLog();
  addCallbacks(newStates);
  angular.forEach(newStates, function(s, name) {$stateProvider.state(name, s)});
}