function findSrc() {
    return glob.sync('**/*', {cwd: path.join(process.cwd(), 'src')});
  }