async function processZipCodeIfNecessary(codeUri) {

  if (!isZipArchive(codeUri)) { return null; }

  const tmpCodeDir = path.join(tmpDir, uuid.v4());

  await fs.ensureDir(tmpCodeDir);

  console.log(`codeUri is a zip format, will unzipping to ${tmpCodeDir}`);

  return await new Promise((resolve, reject) => {
    // use extract-zip instead of unzipper  https://github.com/alibaba/funcraft/issues/756
    extract(codeUri, { dir: tmpCodeDir }, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(tmpCodeDir);
    });
  });
}