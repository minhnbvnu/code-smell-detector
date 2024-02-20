function PathTemplate (template) {
  this.template = template
  this.fields = parseTemplate(template)
  this.matcher = createTemplateMatcher(this.fields)
}