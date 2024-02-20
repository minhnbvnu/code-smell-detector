function startPackager() {
  if (process.env['TARGET_PLATFORM'] == 'linux' || os.platform() == 'darwin') {
    return prepareBuilder();
  }

  var packager = require('electron-packager')
  var out = path.join(__dirname, 'build');
  packager({
    dir: __dirname,
    out: out,
    platform: os.platform(),
    arch: 'all',

    name: manifest.name,
    icon: platformIcon,
    appVersion: manifest.version,
    buildVersion: manifest.version,
    appCopyright: 'Copyright ' + (manifest.author || manifest.name),
    overwrite: true,

    // windows file details (needed for shortcut and stuff)
    win32metadata: {
      CompanyName: manifest.author || manifest.name,
      FileDescription: manifest.name,
      ProductName: manifest.name,
      InternalName: manifest.name,
    },

    // mac signing and url handler
    osxSign: true,
    protocols: [
      {
        name: manifest.name,
        schemes: [ `ec-${appId}` ]
      }
    ],

    // all: true,
    afterCopy: [function(buildPath, electronVersion, platform, arch, callback) {

      console.log(appDir, buildPath);

      var packageJson = path.join(buildPath, 'package.json');
      createPackageJson(packageJson, packageJson);

      console.log('copying app into place');
      ncp(appDir, path.join(buildPath, 'unpacked-crx'), {
        clobber: false,
        dereference: true,
      },
      function (err) {
        if (err) {
          console.error(err);
          process.exit(-1);
        }
        console.log('app copied into place');
        if (!assets) {
          console.log('no assets');
          callback();
          return;
        }

        console.log('copying platform-assets into place for', os.platform());
        var platformAssets = path.join(assets, os.platform());
        var platformAssetsDest = path.join(buildPath, 'platform-assets', os.platform());
        mkdirp.sync(platformAssetsDest);
        ncp(platformAssets, platformAssetsDest, {
          clobber: false,
          dereference: true,
        }, function(err) {
          if (err) {
            console.error(err);
            process.exit(-1);
          }
          console.log('platform-assets copied into place');
          callback();
        })
      });
    }]
  }, function (err, appPaths) {
    if (err) {
      console.error(err);
      throw err;
    }
    console.log('making zips');

    appPaths
    .filter(appPath => appPath.indexOf('darwin') != -1)
    .forEach(appPath => {
      console.log(appPath);
      /*
      var infoPlist = path.join(appPath, manifest.name + '.app', 'Contents', 'Info.plist');
      console.log(infoPlist);
      var child = require('child_process').exec(`defaults write ${infoPlist} CFBundleURLTypes '<array><dict><key>CFBundleURLName</key><string>${manifest.name}</string><key>CFBundleURLSchemes</key><array><string>ec-${appId}</string></array></dict></array>'`)
      child.stdout.pipe(process.stdout);
      child.on('exit', function() {
        makeMacZip();
      })
      */
      makeMacZip(appPath);
    })

    appPaths
    .filter(appPath => appPath.indexOf('win32') != -1)
    .forEach(appPath => {
      var key = Object.keys(manifest.icons).sort((a,b) => parseInt(a) < parseInt(b))[0].toString();
      var icon = path.join(appDir, manifest.icons[key]);
      var iconUrl = 'file://' + icon.replace(/\\/g, '/').replace(':', '');

      iconUrl = 'file://' + path.join(process.cwd(), platformIcon).replace(/\\/g, '/').replace(':', '');
      console.log(iconUrl);

      var resultPromise = electronInstaller.createWindowsInstaller({
        appDirectory: appPath,
        outputDirectory: appPath + '-installer',
        authors: manifest.author || manifest.name,
        version: manifest.version,
        exe: manifest.name + '.exe',
        setupExe: path.basename(appPath) + '.exe',
        productName: manifest.name,
        title: manifest.name,
        name: manifest.name,
        iconUrl: iconUrl,
        description: manifest.description,
        noMsi: true,
      });

      resultPromise.then(() => console.log("Windows Intaller created."), (e) => { console.log(`Windows Installer failed: ${e.message}`); console.log(e); } );
    })

  })
}