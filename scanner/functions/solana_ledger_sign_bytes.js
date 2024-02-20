async function solana_ledger_sign_bytes(
  transport,
  derivation_path,
  msg_bytes,
) {
  var num_paths = Buffer.alloc(1);
  num_paths.writeUInt8(1);
  const payload = Buffer.concat([num_paths, derivation_path, msg_bytes]);

  return solana_send(transport, INS_SIGN_MESSAGE, P1_CONFIRM, payload);
}