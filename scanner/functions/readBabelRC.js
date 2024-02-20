function readBabelRC() {
  var rcpath = path.join(__dirname, 'react-packager', 'rn-babelrc.json');
  var source = fs.readFileSync(rcpath).toString();
  return JSON.parse(source);
}