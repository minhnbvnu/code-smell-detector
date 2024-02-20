function applyBirdkitSettings(settings, projectType) {
  var packagePath = pathJoin(docPath, '..', 'package.json');
  var pkg = fileExists(packagePath) ? readJSONFile(packagePath) : {};

  // Is this a docless birdkit project? (assumes birdkit detected)
  var isEmbed = projectType == 'ai2html' || // manual setting from text block
    pkg.projectTemplate == '@newsdev/template-ai2html' ||
    // (deprecated) read from local ai2html-config.json file
    readConfigFileSettings().project_type == 'ai2html' ||
    // (deprecated) presence of 'config.yml' file indicates an embed
    detectConfigYml() ||
    // another test, to work around permissions issue preventing file reading
    !folderExists(docPath + '../src/');

  if (isEmbed) {
    extendSettings(settings, nytBirdkitEmbedSettings);
    // early versions of birdkit still used config.yml for embed settings
    if (pkg.version && compareVersions(pkg.version, '1.4.0') < 0) {
      settings.create_json_config_files = false;
      settings.create_config_file = true;
      settings.config_file_path = "../config.yml";
    }
  } else {
    extendSettings(settings, nytBirdkitSettings);
  }
}