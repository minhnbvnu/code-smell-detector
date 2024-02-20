function removeTreeListener(object, deepPath, handler) {
  if (typeof deepPath === 'string') {
    deepPath = deepPath.split('.'); // eslint-disable-line no-param-reassign
  }

  // iterate over keys of the path and undelegate given handler (can be undefined)
  for (let i = 0; i < deepPath.length; i++) {
    // TODO: Array.prototype.slice is slow
    const listenedPath = deepPath.slice(0, i);

    undelegateListener(
      object,
      listenedPath,
      `_change:tree:${deepPath[i]}`,
      handler
    );
  }
}