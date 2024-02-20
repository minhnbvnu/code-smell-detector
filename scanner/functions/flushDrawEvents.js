function flushDrawEvents() {
  const drawEvents = [];
  for (let i = 0; i < fireSpy.callCount; i++) {
    const eventName = fireSpy.getCall(i).args[0];
    if (typeof eventName !== 'string' || eventName.indexOf('draw.') !== 0) continue;
    // Ignore draw.render events for now
    if (eventName === 'draw.render') continue;
    // Ignore draw.actionable events for now
    if (eventName === 'draw.actionable') continue;
    drawEvents.push(eventName);
  }
  fireSpy.resetHistory();
  return drawEvents;
}