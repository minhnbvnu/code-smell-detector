function getRepoName(template) {
  return TEMPLATES.includes(template)
    ? `clio-lang/template-${template}`
    : template;
}