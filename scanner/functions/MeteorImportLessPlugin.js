function MeteorImportLessPlugin (dependencyManager) {
  this.minVersion = [2, 5, 0]

  this.install = (less, pluginManager) => {
    pluginManager.addFileManager(new MeteorImportLessFileManager(dependencyManager))
  }
}