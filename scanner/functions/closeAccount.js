function closeAccount({ source, destination, owner }) {
  const keys = [
    { pubkey: source, isSigner: false, isWritable: true },
    { pubkey: destination, isSigner: false, isWritable: true },
    { pubkey: owner, isSigner: true, isWritable: false },
  ];
  return new TransactionInstruction({
    keys,
    data: encodeTokenInstructionData({
      closeAccount: {},
    }),
    programId: TOKEN_PROGRAM_ID,
  });
}