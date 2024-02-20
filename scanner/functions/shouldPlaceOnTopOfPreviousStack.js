function shouldPlaceOnTopOfPreviousStack(functionName) {
  return functionName === '(garbage collector)' || functionName === '(program)';
}