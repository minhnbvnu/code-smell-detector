async function solana_ledger_sign_transaction(
  transport,
  derivation_path,
  transaction,
) {
  const msg_bytes = transaction.serializeMessage();
  return solana_ledger_sign_bytes(transport, derivation_path, msg_bytes);
}