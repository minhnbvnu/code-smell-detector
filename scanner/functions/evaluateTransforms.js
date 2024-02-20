function evaluateTransforms(transforms = [], value, extraParameters = {}) {
  if (process.env.NODE_ENV !== 'production') {
    if (!transforms.every(isFunction)) {
      throw new Error(
        'All transforms weren\'t functions!',
        transforms
      );
    }
  }

  if (transforms.length === 0) {
    return {};
  }

  return mergeProps(...transforms.map(transform => transform(value, extraParameters)));
}