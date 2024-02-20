function memoInstruction(memo) {
  return new TransactionInstruction({
    keys: [],
    data: Buffer.from(memo, 'utf-8'),
    programId: MEMO_PROGRAM_ID,
  });
}