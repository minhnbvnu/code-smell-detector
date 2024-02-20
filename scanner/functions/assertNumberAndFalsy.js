function assertNumberAndFalsy(filter) {
  // should stringify numbers
  expect(filter(12345)).toBe('12345')
  expect(filter(0)).toBe('0')
  expect(filter(undefined)).toBe('')
  expect(filter(null)).toBe('')
  expect(filter(false)).toBe('')
}