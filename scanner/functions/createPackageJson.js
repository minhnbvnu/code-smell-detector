function createPackageJson(inputPackageJson, outputPackageJson, removeBuild) {
  var electronJson = inputPackageJson;
  var electronPackage = JSON.parse(fs.readFileSync(electronJson).toString());
  electronPackage.name = manifest.name;
  electronPackage.description = manifest.description;
  electronPackage.version = manifest.version;
  if (removeBuild)
    delete electronPackage.build;
  chrome = chrome || {};
  chrome.runtimeId = chrome.runtimeId || runtimeId;
  chrome.appId = chrome.appId || appId;
  electronPackage.chrome = chrome;
  fs.writeFileSync(outputPackageJson, JSON.stringify(electronPackage, null, 2));
  return electronPackage;
}