function variable_value(variable) {
  return variable._promise.catch(variable._rejector);
}