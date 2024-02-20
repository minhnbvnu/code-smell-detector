async function zipTo(archive, to) {

  await fs.ensureDir(to);

  await new Promise((resolve, reject) => {
    archive.pipe(tar.extract(to)).on('error', reject).on('finish', resolve);
  });
}