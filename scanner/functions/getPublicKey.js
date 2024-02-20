async function getPublicKey(transport, path) {
  let from_derivation_path;
  if (path) {
    from_derivation_path = path;
  } else {
    from_derivation_path = solana_derivation_path();
  }
  const from_pubkey_bytes = await solana_ledger_get_pubkey(
    transport,
    from_derivation_path,
  );
  const from_pubkey_string = bs58.encode(from_pubkey_bytes);

  return new PublicKey(from_pubkey_string);
}