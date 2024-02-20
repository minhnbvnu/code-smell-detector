function getRoots() {
  var root = process.env.REACT_NATIVE_APP_ROOT;
  if (root) {
    return [path.resolve(root)];
  }
  if (__dirname.match(/node_modules[\/\\]react-native[\/\\]local-cli$/)) {
    // Packager is running from node_modules.
    // This is the default case for all projects created using 'react-native init'.
    return [path.resolve(__dirname, '../../..')];
  } else if (__dirname.match(/Pods[\/\\]React[\/\\]packager$/)) {
     // React Native was installed using CocoaPods.
    return [path.resolve(__dirname, '../../..')];
  } else {
    return [path.resolve(__dirname, '..')];
  }
}