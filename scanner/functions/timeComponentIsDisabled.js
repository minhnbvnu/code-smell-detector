function timeComponentIsDisabled (min, max, component) {
  return (min !== null && component < min) ||
         (max !== null && component > max)
}