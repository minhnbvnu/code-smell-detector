function getApplication() {
  let namespaces = Namespace.NAMESPACES;
  let application;

  namespaces.forEach((namespace) => {
    if (namespace instanceof Application) {
      application = namespace;
      return false;
    }
  });
  return application;
}