function addTreeListener(object, deepPath, handler) {
  if (typeof deepPath === 'string') {
    deepPath = deepPath.split('.'); // eslint-disable-line no-param-reassign
  }

  // iterate over all keys and delegate listener for all objects of given branch
  for (let i = 0; i < deepPath.length; i++) {
    // TODO: Array.prototype.slice method is slow
    const listenPath = deepPath.slice(0, i);
    const restPath = deepPath.slice(i + 1);

    delegateListener(
      object,
      listenPath,
      `_change:tree:${deepPath[i]}`,
      createTreeListener({
        handler,
        restPath
      })
    );
  }
}