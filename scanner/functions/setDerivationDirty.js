function setDerivationDirty(derivation) {
  if (derivation.dependenciesState === DerivationState.UP_TO_DATE) {
    derivation.onBecomeDirty();
  }

  derivation.dependenciesState = DerivationState.DIRTY;
}