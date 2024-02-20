function setAccountName(selector, newName) {
    if (selector.importedPubkey && !selector.ledger) {
      let newPrivateKeyImports = { ...privateKeyImports };
      newPrivateKeyImports[selector.importedPubkey.toString()].name = newName;
      setPrivateKeyImports(newPrivateKeyImports);
    } else {
      localStorage.setItem(`name${selector.walletIndex}`, newName);
      setWalletNames(getWalletNames());
    }
  }