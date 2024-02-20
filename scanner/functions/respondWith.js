function respondWith(type, payload, options = {}) {
  return new Promise((resolve, reject) => {
    let { count, isDefault } = { count: 1, isDefault: false, ...options };
    let callback = typeof payload === 'function' ? payload : () => payload;

    responders.push({
      type,
      isDefault,
      callback,
      actual: 0,
      expected: count === false ? NaN : count,
      resolve,
      reject,
    });
  });
}