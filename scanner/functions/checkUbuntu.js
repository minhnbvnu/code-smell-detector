function checkUbuntu(args) {
  return fs.existsSync(path.join(args.root, 'ubuntu/CMakeLists.txt')) &&
         process.platform.startsWith('linux');
}