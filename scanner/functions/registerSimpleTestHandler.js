function registerSimpleTestHandler() {
  putListener(CHILD, ON_CLICK_KEY, LISTENER);
  const listener = getListener(CHILD, ON_CLICK_KEY);
  expect(listener).toEqual(LISTENER);
  return getListener(CHILD, ON_CLICK_KEY);
}