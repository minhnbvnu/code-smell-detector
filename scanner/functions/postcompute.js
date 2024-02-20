function postcompute(value, promise) {
    variable._value = value;
    variable._promise = promise;
    variable._outputs.forEach(runtime._updates.add, runtime._updates);
    return runtime._compute();
  }