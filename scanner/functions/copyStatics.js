async function copyStatics() {
  return cpy('**/*', '../build', {
    cwd: STATIC_PATH,
    parents: true
  });
}