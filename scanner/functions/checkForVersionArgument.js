function checkForVersionArgument() {
  if (argv._.length === 0 && (argv.v || argv.version)) {
    console.log('react-native-cli: ' + require('./package.json').version);
    try {
      console.log('react-native: ' + require(REACT_NATIVE_PACKAGE_JSON_PATH()).version);
    } catch (e) {
      console.log('react-native: n/a - not inside a React Native project directory')
    }
    process.exit();
  }
}