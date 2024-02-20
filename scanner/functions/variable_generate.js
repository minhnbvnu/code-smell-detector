function variable_generate(variable, version, generator) {
  const runtime = variable._module._runtime;
  let currentValue; // so that yield resolves to the yielded value

  // Retrieve the next value from the generator; if successful, invoke the
  // specified callback. The returned promise resolves to the yielded value, or
  // to undefined if the generator is done.
  function compute(onfulfilled) {
    return new Promise(resolve => resolve(generator.next(currentValue))).then(({done, value}) => {
      return done ? undefined : Promise.resolve(value).then(onfulfilled);
    });
  }

  // Retrieve the next value from the generator; if successful, fulfill the
  // variable, compute downstream variables, and schedule the next value to be
  // pulled from the generator at the start of the next animation frame. If not
  // successful, reject the variable, compute downstream variables, and return.
  function recompute() {
    const promise = compute((value) => {
      if (variable._version !== version) throw variable_stale;
      currentValue = value;
      postcompute(value, promise).then(() => runtime._precompute(recompute));
      variable._fulfilled(value);
      return value;
    });
    promise.catch((error) => {
      if (error === variable_stale || variable._version !== version) return;
      postcompute(undefined, promise);
      variable._rejected(error);
    });
  }

  // After the generator fulfills or rejects, set its current value, promise,
  // and schedule any downstream variables for update.
  function postcompute(value, promise) {
    variable._value = value;
    variable._promise = promise;
    variable._outputs.forEach(runtime._updates.add, runtime._updates);
    return runtime._compute();
  }

  // When retrieving the first value from the generator, the promise graph is
  // already established, so we only need to queue the next pull.
  return compute((value) => {
    if (variable._version !== version) throw variable_stale;
    currentValue = value;
    runtime._precompute(recompute);
    return value;
  });
}