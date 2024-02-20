function strCryptCmpSync(taintedClear, localHash) {
  return bcrypt.compareSync(taintedClear, localHash);
}