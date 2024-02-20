function printUsage() {
  console.log([
    'Usage: react-native <command>',
    '',
    'Commands:'
  ].concat(Object.keys(documentedCommands).map(function(name) {
    return '  - ' + name + ': ' + documentedCommands[name][1];
  })).join('\n'));
  process.exit(1);
}