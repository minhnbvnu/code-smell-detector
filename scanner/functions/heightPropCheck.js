function heightPropCheck(props, propName, componentName) {
  if (
    (typeof props[propName] !== 'number') &&
    (!props.style || typeof props.style.maxHeight !== 'number') &&
    (!props.container || typeof props.container !== 'function')
  ) {
    return new Error(`height or style.maxHeight of type 'number' or container of type 'function' is marked as required in ${componentName}`);
  }

  return undefined;
}