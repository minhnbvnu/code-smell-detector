function createRotationConstraint(options) {
  const enableRotation =
    options.enableRotation !== undefined ? options.enableRotation : true;
  if (enableRotation) {
    const constrainRotation = options.constrainRotation;
    if (constrainRotation === undefined || constrainRotation === true) {
      return createSnapToZero();
    }
    if (constrainRotation === false) {
      return rotationNone;
    }
    if (typeof constrainRotation === 'number') {
      return createSnapToN(constrainRotation);
    }
    return rotationNone;
  }
  return disable;
}