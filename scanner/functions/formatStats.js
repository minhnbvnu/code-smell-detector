function formatStats (config, stats) {
  if (countEmittedAssets(stats.assets) > 0) {
    console.log(indentLine(2, 'Files:'.bold.green))

    stats.assets.forEach(function (asset) {
      var pathToAsset = path.relative(process.cwd(), path.join(config.output.path, asset.name))
      var sizeOfAsset = filesize(asset.size)
      if (asset.emitted) {
        console.log(indentLines(4, pathToAsset + ' (' + sizeOfAsset + ')'))
      }
    })

    doublespace()
  }
}