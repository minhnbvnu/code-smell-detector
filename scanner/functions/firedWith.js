function firedWith(tester, eventName, expectedEventData) {
  const call = getEventCall(eventName);
  if (!call) {
    tester.fail(`${eventName} never called`);
    return {};
  }
  tester.pass(`${eventName} called`);
  const actualEventData = xtend(call.args[1]);

  if (actualEventData.features) {
    actualEventData.features = actualEventData.features.map(withoutId);
  }
  tester.deepEqual(actualEventData, expectedEventData, 'with correct data');
  return call.args[1];
}