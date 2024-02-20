function getReqd() {
  return {
    params: { a: 1, b: 2, c: 3 },
    [symbols.transactionIinfo]: {
      transaction: transaction,
      segmentStack: [],
      errorHandled: false,
      error: null
    }
  }
}