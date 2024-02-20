async function prepareBuilder() {
  console.log('packaging only');
  var buildPath = path.join(__dirname, 'build');
  mkdirp.sync(buildPath);
  for (var f of ['electron-main.js', 'electron-background.html', 'package.json', 'node_modules', 'chrome']) {
    await ncpp(path.join(__dirname, f), path.join(buildPath, f), ncpOpts);
  }
  await ncpp(appDir, path.join(buildPath, 'unpacked-crx'), ncpOpts);

  if (assets) {
    var platformAssets = path.join(assets, os.platform());
    var platformAssetsDest = path.join(buildPath, 'platform-assets', os.platform());
    mkdirp.sync(platformAssetsDest);
    await ncpp(platformAssets, platformAssetsDest, ncpOpts);
  }
  else {
    console.log('no assets');
  }

  const darwin = os.platform() === 'darwin';
  var mergedPackageJson = createPackageJson(path.join(buildPath, 'package.json'), path.join(buildPath, 'package.json'), darwin);
  console.log(JSON.stringify(mergedPackageJson, null, 2));

  if (!darwin)
    return;

  if (os.platform() === 'darwin') {
    console.log('building mac.app');
    const builder = require("electron-builder")
    const Platform = builder.Platform
    await builder.build({
      targets: Platform.MAC.createTarget(),
      config: {
        directories: {
          app: buildPath,
        }
      }
    })

    const chromeJson = mergedPackageJson.chrome;
    if (chromeJson && chromeJson.mac && chromeJson.mac.notarize) {
      console.log('notarizing mac.app');

      const notarize = Object.assign({}, chromeJson.mac.notarize);
      const appPath = path.join(__dirname, `dist/mac/${manifest.name}.app`);
      console.log(appPath)
      notarize.appPath = appPath;

      const en = require('electron-notarize');
      await en.notarize(notarize)
    }

    makeMacZip(path.join(__dirname, 'dist/mac/'))
  }
}