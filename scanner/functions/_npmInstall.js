function _npmInstall(library) {
  const command = 'npm install --save ' + library;
  console.log('Running ' + command);
  try {
    execSync(command);
  } catch (e) {
    throw command + ' failed';
  }
}