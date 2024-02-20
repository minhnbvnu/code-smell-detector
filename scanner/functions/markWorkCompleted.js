function markWorkCompleted(type, stopTime, currentProfilerData, stack) {
  if (stack.length === 0) {
    console.error('Unexpected type "%s" completed at %sms while stack is empty.', type, stopTime); // Ignore work "completion" user timing mark that doesn't complete anything

    return;
  }

  const last = stack[stack.length - 1];

  if (last.type !== type) {
    console.error('Unexpected type "%s" completed at %sms before "%s" completed.', type, stopTime, last.type);
  }

  const {
    measure,
    startTime
  } = stack.pop();

  if (!measure) {
    console.error('Could not find matching measure for type "%s".', type);
  } // $FlowFixMe This property should not be writable outside of this function.


  measure.duration = stopTime - startTime;
}