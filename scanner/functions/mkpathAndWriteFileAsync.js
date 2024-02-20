async function mkpathAndWriteFileAsync(fileName, contents, encoding) {
  try {
    await writeFile(fileName, contents, encoding);
  } catch (err) {
    if (err.code === 'ENOENT') {
      await mkdirp(Path.dirname(fileName));
      await writeFile(fileName, contents, encoding);
    } else {
      throw err;
    }
  }
}