function assertOwner({ account, owner }) {
  const keys = [{ pubkey: account, isSigner: false, isWritable: false }];
  return new TransactionInstruction({
    keys,
    data: encodeOwnerValidationInstruction({ account: owner }),
    programId: OWNER_VALIDATION_PROGRAM_ID,
  });
}