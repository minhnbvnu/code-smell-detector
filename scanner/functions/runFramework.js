function runFramework(context) {

  const mocha = Mocha.sharedRuntime();

  const frameworkName = "SketchIconsFramework";
  const directory = context.scriptPath.stringByDeletingLastPathComponent();

  if (mocha.valueForKey(frameworkName)) {
    return true;
  } else if (mocha.loadFrameworkWithName_inDirectory(frameworkName, directory)) {
    mocha.setValue_forKey_(true, frameworkName);
    return true;
  } else {
    log("❌ loadFramework: `" + frameworkName + "` failed!: " + directory + ". Please define SketchIcons_FrameworkPath if you're trying to @import in a custom plugin");
    return false;
  }
}