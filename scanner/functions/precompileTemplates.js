function precompileTemplates(cb) {
  precompile(getAssetPath('templates'), getAssetPath('templates.js'), cb);
}