function recordReactMeasureCompleted(type) {
    const currentTime = getRelativeTime();

    if (currentReactMeasuresStack.length === 0) {
      console.error('Unexpected type "%s" completed at %sms while currentReactMeasuresStack is empty.', type, currentTime); // Ignore work "completion" user timing mark that doesn't complete anything

      return;
    }

    const top = currentReactMeasuresStack.pop();

    if (top.type !== type) {
      console.error('Unexpected type "%s" completed at %sms before "%s" completed.', type, currentTime, top.type);
    } // $FlowFixMe This property should not be writable outside of this function.


    top.duration = currentTime - top.timestamp;

    if (currentTimelineData) {
      currentTimelineData.duration = getRelativeTime() + TIME_OFFSET;
    }
  }