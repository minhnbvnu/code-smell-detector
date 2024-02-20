function printInitWarning() {
  return Promise.resolve().then(function() {
    console.log([
      'Looks like React Native project already exists in the current',
      'folder. Run this command from a different folder or remove node_modules/react-native'
    ].join('\n'));
    process.exit(1);
  });
}