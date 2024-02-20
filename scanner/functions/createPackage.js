async function createPackage(
  packageName,
  target = "js",
  template = "node"
) {
  try {
    preValidations(packageName, target);
    if (target === "js") return await createPackageJs(packageName, template);
  } catch (e) {
    error(e);
    process.exit(1);
  }
}