function renderContent(content, context) {
  return template(content)(context.vars);
}