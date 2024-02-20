function isMandatorySetter(descriptor) {
  if (descriptor.set && descriptor.set === Ember.MANDATORY_SETTER_FUNCTION) {
    return true;
  }
  if (
    descriptor.set &&
    Function.prototype.toString
      .call(descriptor.set)
      .includes('You attempted to update')
  ) {
    return true;
  }
  return false;
}