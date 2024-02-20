function isOwned(pubkey) {
    if (!pubkey) {
      return false;
    }
    if (
      publicKeys?.some((ownedAccountPubkey) =>
        ownedAccountPubkey.equals(pubkey),
      )
    ) {
      return true;
    }
    return accountStates[pubkey.toBase58()] === states.OWNED;
  }