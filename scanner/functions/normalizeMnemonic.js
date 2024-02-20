function normalizeMnemonic(mnemonic) {
  return mnemonic.trim().split(/\s+/g).join(" ");
}