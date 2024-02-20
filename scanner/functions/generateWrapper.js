function generateWrapper(args, config) {
  return generate([
    '--platform', 'android',
    '--project-path', process.cwd(),
    '--project-name', JSON.parse(
      fs.readFileSync('package.json', 'utf8')
    ).name
  ], config);
}