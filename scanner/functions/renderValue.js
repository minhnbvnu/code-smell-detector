function renderValue ($$, comp, doc, path, options = {}) {
  let prop = doc.getProperty(path)
  let valueModel = createValueModel(comp.context.editorSession, path, prop)
  return renderModel($$, comp, valueModel, options)
}