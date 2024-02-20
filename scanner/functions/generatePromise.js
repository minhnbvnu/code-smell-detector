function generatePromise(props) {
  return {
    guid: `ember${++guids}`,
    label: 'Generated Promise',
    parent: null,
    children: null,
    state: 'created',
    value: null,
    reason: null,
    createdAt: Date.now(),
    hasStack: false,
    ...props,
  };
}