function shortModelName(model) {
  let name = modelName(model);
  // jj-abrams-resolver adds `app@model:`
  return name.replace(/<[^>]+@model:/g, '<');
}