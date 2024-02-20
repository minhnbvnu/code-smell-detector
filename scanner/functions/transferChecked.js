function transferChecked({ source, mint, destination, amount, decimals, owner }) {
  let keys = [
    { pubkey: source, isSigner: false, isWritable: true },
    { pubkey: mint, isSigner: false, isWritable: false },
    { pubkey: destination, isSigner: false, isWritable: true },
    { pubkey: owner, isSigner: true, isWritable: false },
  ];
  return new TransactionInstruction({
    keys,
    data: encodeTokenInstructionData({
      transferChecked: { amount, decimals },
    }),
    programId: TOKEN_PROGRAM_ID,
  });
}