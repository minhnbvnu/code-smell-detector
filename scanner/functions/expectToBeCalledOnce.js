function expectToBeCalledOnce(fn) {
  expect(fn.mock.calls.length).toBe(1);
}