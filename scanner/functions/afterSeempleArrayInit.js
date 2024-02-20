function afterSeempleArrayInit() {
  // we need to calculate hasModel before change:Model is added
  const hasModel = 'Model' in this;

  // call Seemple initializer
  afterSeempleInit.call(this);

  addListener(this, '_change:common:Model', changeModel, this, {
    skipChecks: true
  });

  addListener(this, '_change:common:itemRenderer', changeItemRendererHandler, this, {
    skipChecks: true
  });

  // call changeModel handler immediately if model is present
  // it will throw an error if Model is not a function
  if (hasModel) {
    changeModel.call(this);
  }
}