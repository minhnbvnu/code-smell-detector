function copyPublicFolder() {
  fs.copySync('public', 'build', {
    dereference: true,
  });
}