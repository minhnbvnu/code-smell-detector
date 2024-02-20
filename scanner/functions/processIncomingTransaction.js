async function processIncomingTransaction(tx) {
  if (tx._id.startsWith('T') && !tx._id.includes('-') && !tx._deleted) {
    await save({
      ...tx,
      id: `T${tx.date}-${tx._id.substr(1)}`,
      date: undefined,
      tags: tx.tags && tx.tags.length ? tx.tags : undefined,
      note: tx.note && tx.note.length ? tx.note : undefined
    });
    await transactionsDB().remove(tx);
  }

  return tx;
}