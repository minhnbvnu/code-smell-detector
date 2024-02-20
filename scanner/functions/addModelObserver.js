function addModelObserver (model, fn, comp, options = {}) {
  let stage = options.stage || 'render'
  if (model._isValue) {
    let path = model.getPath()
    comp.context.editorState.addObserver(['document'], fn, comp, {
      stage,
      document: { path }
    })
  }
}