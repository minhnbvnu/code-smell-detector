function addTypesToShow(resources, types, template) {
  for (const resource of resources) {
    types.push(template.Resources[resource].Type);
    if (template.Resources[resource].Template) {
      addTypesToShow(
        Object.keys(template.Resources[resource].Template.Resources),
        types,
        template.Resources[resource].Template
      );
    }
  }
}