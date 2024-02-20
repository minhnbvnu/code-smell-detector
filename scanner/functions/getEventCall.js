function getEventCall(eventName) {
  for (let i = 0; i < fireSpy.callCount; i++) {
    const call = fireSpy.getCall(i);
    if (call.args[0] === eventName) return call;
  }
}