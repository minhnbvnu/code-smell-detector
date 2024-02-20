async function solana_ledger_get_pubkey(transport, derivation_path) {
  return solana_send(
    transport,
    INS_GET_PUBKEY,
    P1_NON_CONFIRM,
    derivation_path,
  );
}