function _link(argv, config) {
  // argv examples:
  // ['link', 'awesome-camera']
  // ['link', 'awesome-camera@0.2']
  if (argv.length !== 2) {
    throw 'Please provide one argument (library to install).\n' +
        'Usage example: react-native link awesome-camera';
  }

  const libraryAndVersion = argv[1];
  const library = libraryAndVersion.split('@')[0];

  _npmInstall(libraryAndVersion);
  _maybeLinkAndroid(library);
}