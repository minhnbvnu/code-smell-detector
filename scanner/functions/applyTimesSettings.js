function applyTimesSettings(settings, blockSettings) {
  var yamlConfig = readYamlConfigFile(docPath + '../config.yml') || null;
  // project type can be set manually in the text block settings
  var projectType = blockSettings && blockSettings.project_type || null;
  extendSettings(settings, nytOverrideSettings);

  if (detectBirdkitEnv()) {
    applyBirdkitSettings(settings, projectType);

  } else if (detectConfigYml()) {
    // assume this is a legacy preview project
    if (!yamlConfig) {
      warn('ai2html is unable to read the contents of config.yml');
    }
    if (projectType == 'ai2html' || (yamlConfig && yamlConfig.project_type == 'ai2html')) {
      extendSettings(settings, nytPreviewEmbedSettings);
    } else {
      extendSettings(settings, nytPreviewSettings);
    }
    if (yamlConfig && yamlConfig.scoop_slug) {
      settings.scoop_slug_from_config_yml = yamlConfig.scoop_slug;
    }
    // Read .git/config file to get preview slug
    var gitConfig = readGitConfigFile(docPath + "../.git/config") || {};
    if (gitConfig.url) {
      settings.preview_slug = gitConfig.url.replace( /^[^:]+:/ , "" ).replace( /\.git$/ , "");
    }
  }

  if (!folderExists(docPath + '../public/')) {
    error("Your project seems to be missing a \u201Cpublic\u201D folder.");
  }

  if (!settings.project_type) {
    error("ai2html is unable to determine the type of this project.");
  } else if (settings.project_type != 'ai2html' && !folderExists(docPath + '../src/')) {
    error("This seems to be a " + settings.project_type + " type project, but it is missing the expected \u201Csrc\u201D folder.");
  }
}