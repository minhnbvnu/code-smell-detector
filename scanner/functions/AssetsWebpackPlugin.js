function AssetsWebpackPlugin (options) {
  this.options = _.merge({}, {
    filename: 'webpack-assets.json',
    prettyPrint: false,
    update: false,
    fullPath: true,
    manifestFirst: true,
    useCompilerPath: false,
    fileTypes: ['js', 'css'],
    includeAllFileTypes: true,
    includeFilesWithoutChunk: false,
    includeAuxiliaryAssets: false,
    includeDynamicImportedAssets: false,
    keepInMemory: false,
    integrity: false,
    removeFullPathAutoPrefix: false
  }, options)
}