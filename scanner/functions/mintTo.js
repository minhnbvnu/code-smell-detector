function mintTo({ mint, destination, amount, mintAuthority }) {
  let keys = [
    { pubkey: mint, isSigner: false, isWritable: true },
    { pubkey: destination, isSigner: false, isWritable: true },
    { pubkey: mintAuthority, isSigner: true, isWritable: false },
  ];
  return new TransactionInstruction({
    keys,
    data: encodeTokenInstructionData({
      mintTo: {
        amount,
      },
    }),
    programId: TOKEN_PROGRAM_ID,
  });
}