async function makeTmpDir(tmpDir) {
  let stats;
  let error;
  try {
    stats = await fs.lstat(tmpDir);   
  } catch (err) {
    error = err;
  }
  if (error || (!error && stats.isFile())) {
    await fs.mkdirp(tmpDir);
    await fs.chmod(tmpDir, 0o1777);
  }
}