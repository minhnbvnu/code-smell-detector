function changeModel() {
  const { Model } = this;

  // if model has wrong type then throw an error
  if (typeof Model !== 'function') {
    throw seempleError('array:model_type', { Model });
  }

  // attatch item mediator
  this.mediateItem(modelItemMediator);
}