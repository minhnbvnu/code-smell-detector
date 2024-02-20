function shouldCompute(derivation) {
  switch (derivation.dependenciesState) {
    case DerivationState.UP_TO_DATE:
      return false;

    case DerivationState.NOT_TRACKING:
    case DerivationState.DIRTY:
      return true;

    case DerivationState.MYBE_DIRTY:
      {
        var prevUntracked = untrackedStart();
        var obs = derivation.observing;
        var l = obs.length;

        for (var i = 0; i < l; i++) {
          var obj = obs[i];

          if (isModifiedValue(obj)) {
            obj.ifModified();
          }

          if (derivation.dependenciesState === DerivationState.DIRTY) {
            untrackedEnd(prevUntracked);
            return true;
          }
        }

        changeDependenciesStateTo0(derivation);
        untrackedEnd(prevUntracked);
        return false;
      }
  }
}