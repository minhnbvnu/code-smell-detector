function getArgs() {
  var args = yargs
    .usage(
      'Converts HTML to JSX for use with React.\n' +
      'Usage: $0 [-c ComponentName] file.htm'
    )
    .describe('className', 'Create a React component (wraps JSX in React.createClass call)')
    .alias('className', 'c')
    .help('help')
    .example(
      '$0 -c AwesomeComponent awesome.htm',
      'Creates React component "AwesomeComponent" based on awesome.htm'
    )
    .strict();

  var files = args.argv._;
  if (!files || files.length === 0) {
    console.error('Please provide a file name');
    args.showHelp();
    process.exit(1);
  }
  return args.argv;
}