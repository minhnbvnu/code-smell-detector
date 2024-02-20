function generateUbuntu(args, config) {
  return generate([
    '--platform', 'ubuntu',
    '--project-path', process.cwd(),
    '--project-name', JSON.parse(
      fs.readFileSync('package.json', 'utf8')
    ).name
  ], config);
}