function printHelp($0, prn) {
  var usageFile = require.resolve('../bin/sl-pm-install.txt');
  var USAGE = fs.readFileSync(usageFile, 'utf-8')
                .replace(/%MAIN%/g, $0)
                .trim();
  prn(USAGE);
}