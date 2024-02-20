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