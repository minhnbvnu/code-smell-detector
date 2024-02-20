function solana_derivation_path(account, change, derivationPath) {
  let useAccount = account ? account : 0;
  let useChange = change ? change : 0;
  derivationPath = derivationPath
    ? derivationPath
    : DERIVATION_PATH.bip44Change;

  if (derivationPath === DERIVATION_PATH.bip44Root) {
    const length = 2;
    const derivation_path = Buffer.alloc(1 + length * 4);
    let offset = 0;
    offset = derivation_path.writeUInt8(length, offset);
    offset = derivation_path.writeUInt32BE(_harden(44), offset); // Using BIP44
    derivation_path.writeUInt32BE(_harden(501), offset); // Solana's BIP44 path
    return derivation_path;
  } else if (derivationPath === DERIVATION_PATH.bip44) {
    const length = 3;
    const derivation_path = Buffer.alloc(1 + length * 4);
    let offset = 0;
    offset = derivation_path.writeUInt8(length, offset);
    offset = derivation_path.writeUInt32BE(_harden(44), offset); // Using BIP44
    offset = derivation_path.writeUInt32BE(_harden(501), offset); // Solana's BIP44 path
    derivation_path.writeUInt32BE(_harden(useAccount), offset);
    return derivation_path;
  } else if (derivationPath === DERIVATION_PATH.bip44Change) {
    const length = 4;
    const derivation_path = Buffer.alloc(1 + length * 4);
    let offset = 0;
    offset = derivation_path.writeUInt8(length, offset);
    offset = derivation_path.writeUInt32BE(_harden(44), offset); // Using BIP44
    offset = derivation_path.writeUInt32BE(_harden(501), offset); // Solana's BIP44 path
    offset = derivation_path.writeUInt32BE(_harden(useAccount), offset);
    derivation_path.writeUInt32BE(_harden(useChange), offset);
    return derivation_path;
  } else {
    throw new Error('Invalid derivation path');
  }
}