function variable_compute(variable) {
  variable._invalidate();
  variable._invalidate = noop;
  variable._pending();

  const value0 = variable._value;
  const version = ++variable._version;

  // Lazily-constructed invalidation variable; only constructed if referenced as an input.
  let invalidation = null;

  // If the variable doesn’t have any inputs, we can optimize slightly.
  const promise = variable._promise = (variable._inputs.length
      ? Promise.all(variable._inputs.map(variable_value)).then(define)
      : new Promise(resolve => resolve(variable._definition.call(value0))))
    .then(generate);

  // Compute the initial value of the variable.
  function define(inputs) {
    if (variable._version !== version) throw variable_stale;

    // Replace any reference to invalidation with the promise, lazily.
    for (let i = 0, n = inputs.length; i < n; ++i) {
      switch (inputs[i]) {
        case variable_invalidation: {
          inputs[i] = invalidation = variable_invalidator(variable);
          break;
        }
        case variable_visibility: {
          if (!invalidation) invalidation = variable_invalidator(variable);
          inputs[i] = variable_intersector(invalidation, variable);
          break;
        }
        case variable_variable: {
          inputs[i] = variable;
          break;
        }
      }
    }

    return variable._definition.apply(value0, inputs);
  }

  // If the value is a generator, then retrieve its first value, and dispose of
  // the generator if the variable is invalidated. Note that the cell may
  // already have been invalidated here, in which case we need to terminate the
  // generator immediately!
  function generate(value) {
    if (variable._version !== version) throw variable_stale;
    if (generatorish(value)) {
      (invalidation || variable_invalidator(variable)).then(variable_return(value));
      return variable_generate(variable, version, value);
    }
    return value;
  }

  promise.then((value) => {
    variable._value = value;
    variable._fulfilled(value);
  }, (error) => {
    if (error === variable_stale || variable._version !== version) return;
    variable._value = undefined;
    variable._rejected(error);
  });
}