function variable_reachable(variable) {
  if (variable._observer !== no_observer) return true; // Directly reachable.
  const outputs = new Set(variable._outputs);
  for (const output of outputs) {
    if (output._observer !== no_observer) return true;
    output._outputs.forEach(outputs.add, outputs);
  }
  return false;
}