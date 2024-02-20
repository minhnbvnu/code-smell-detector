function getBabelRc(cwd) {
  const rcPath = join(cwd, '.dvarc');
  if (pathExists.sync(rcPath)) {
    return JSON.parse(readFileSync(rcPath, 'utf-8'));
  } else {
    return {};
  }
}