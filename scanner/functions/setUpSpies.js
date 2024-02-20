function setUpSpies(mountedComponent) {
  addTransactionSpy = jest.spyOn(mountedComponent.instance().props, 'addTransaction');
  updateTransactionSpy = jest.spyOn(mountedComponent.instance().props, 'updateTransaction');
  deleteTransactionSpy = jest.spyOn(mountedComponent.instance().props, 'deleteTransaction');
  setEditTransactionSpy = jest.spyOn(mountedComponent.instance().props, 'setEditTransaction');
}