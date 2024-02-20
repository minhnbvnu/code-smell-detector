function packageJson() {
  var packageObj,
    projectName;
  try {
    packageObj = require(process.cwd() + path.sep + 'package.json');
    projectName = packageObj.name;
  } catch (e) {
    // package.json not found
  }

  return projectName;
}