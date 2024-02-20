function expectOpenResource(file, line, options = {}) {
  if (!resourcesEnabled) {
    throw new Error('call enableOpenResource first');
  }

  return new Promise((resolve, reject) => {
    let { count } = { count: 1, ...options };
    resources.push({
      file,
      line,
      actual: 0,
      expected: count === false ? NaN : count,
      resolve,
      reject,
    });
  });
}