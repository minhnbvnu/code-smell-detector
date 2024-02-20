function renderTemplate (el, templateName) {
  const template = Blaze._getTemplate(templateName, null)
  if (!template) {
    throw new Error(`Blaze template '${templateName}' not found.`)
  }
  el.blazeView = Blaze.render(template, el)
}