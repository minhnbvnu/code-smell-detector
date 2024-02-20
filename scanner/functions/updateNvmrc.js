function updateNvmrc(nodeVersion) {
  fs.writeFileSync(path.resolve(__dirname, '..', '.nvmrc'), `${nodeVersion}\n`);
}