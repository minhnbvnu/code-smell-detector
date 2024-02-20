function changeDependenciesStateTo0(derivation) {
  if (derivation.dependenciesState === DerivationState.UP_TO_DATE) {
    return;
  }

  derivation.dependenciesState = DerivationState.UP_TO_DATE;
  var obs = derivation.observing;
  var i = obs.length;

  while (i--) {
    obs[i].lowestObserverState = DerivationState.UP_TO_DATE;
  }
}