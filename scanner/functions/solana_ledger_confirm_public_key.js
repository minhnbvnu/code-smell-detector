async function solana_ledger_confirm_public_key(
  transport,
  derivation_path,
) {
  return await solana_send(
    transport,
    INS_GET_PUBKEY,
    P1_CONFIRM,
    derivation_path,
  );
}