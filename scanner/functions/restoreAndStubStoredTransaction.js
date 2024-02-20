function restoreAndStubStoredTransaction(expectedState, expectedTransaction) {
  TransactionManager.prototype.getStoredTransaction.restore();
  sinon
    .stub(TransactionManager.prototype, 'getStoredTransaction')
    .callsFake(function (state) {
      if (state !== 'ignore-test-state-check') {
        expect(state).to.be(expectedState);
      }
      return expectedTransaction;
    });
}