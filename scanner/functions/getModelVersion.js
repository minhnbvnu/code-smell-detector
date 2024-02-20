function getModelVersion(model = {}) {
  let nameOnRoot = model && v.isStringHasLength(model.entity);
  let nameInModelNamespace =
    model && model.model && v.isStringHasLength(model.model.entity);
  if (nameInModelNamespace) {
    return t.ModelVersions.v1;
  } else if (nameOnRoot) {
    return t.ModelVersions.beta;
  } else {
    return "";
  }
}