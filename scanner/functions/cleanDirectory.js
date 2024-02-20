async function cleanDirectory(directory) {
  debug(`check directory ${directory} exist?`);

  if (await fs.pathExists(directory)) {
    debug(`directory ${directory} exist, begin to remove`);
    await fs.remove(directory);

    debug(`directory ${directory} removed, begin to create`);
    await fs.mkdir(directory);
  }
}