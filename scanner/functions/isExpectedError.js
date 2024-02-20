function isExpectedError(e, suffix) {
  // HH700: Artifact not found - from https://hardhat.org/hardhat-runner/docs/errors#HH700
  return HardhatError.isHardhatError(e) && e.number === 700 && suffix !== '';
}