function setoriginalXYAccordingToPosition(
  originalX,
  originalY,
  position,
  data
) {
  'worklet';
  let idx = 0;
  for (let i = 0; i < data.value.length; i++) {
    if (data.value[i].x >= position) {
      idx = i;
      break;
    }
    if (i === data.value.length - 1) {
      idx = data.value.length - 1;
    }
  }
  if (!data.value[idx]) {
    // prevent the following error on android:
    // java.lang.RuntimeException: undefined is not an object (evaluating 'data.value[idx].originalX')
    // why data.value = [] sometimes onActive?
    // eslint-disable-next-line no-console
    console.warn('No data available for chart', data.value.length, idx);
    return;
  }
  originalX.value = data.value[idx].originalX.toString();
  originalY.value = data.value[idx].originalY
    ? data.value[idx].originalY.toString()
    : 'undefined';
}