function serializeHooksForCopy(hooks) {
  // $FlowFixMe "HooksTree is not an object"
  const cloned = Object.assign([], hooks);
  const queue = [...cloned];

  while (queue.length > 0) {
    const current = queue.pop(); // These aren't meaningful

    delete current.id;
    delete current.isStateEditable;

    if (current.subHooks.length > 0) {
      queue.push(...current.subHooks);
    }
  }

  sanitize(cloned);

  try {
    return JSON.stringify(cloned, null, 2);
  } catch (error) {
    return '';
  }
}