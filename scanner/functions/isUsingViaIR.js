function isUsingViaIR(solidity) {

  for (compiler of solidity.compilers) {
    if (compiler.settings && compiler.settings.viaIR) {
      return true;
    }
  }
  if (solidity.overrides) {
    for (key of Object.keys(solidity.overrides)){
      if (solidity.overrides[key].settings && solidity.overrides[key].settings.viaIR) {
        return true;
      }
    }
  }
  return false;
}