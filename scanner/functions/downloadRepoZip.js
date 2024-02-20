async function downloadRepoZip(repoType, repoUrl, repoDir, outputDir, checkout) {
  if (checkout) {
    console.warn(`Need to install ${repoType} to support checkout.`);
  }
  debug('start downloading...');
  // https://github.com/JacksonTian/httpx/blob/master/lib/index.js#L36-L44
  const response = await httpx.request(getRepoZipUrl(repoUrl), { timeout: 36000000, method: 'GET' }); // 10 hours
  const len = parseInt(response.headers['content-length'], 10);
  let bar;
  if (len) {
    bar = createProgressBar(`${green(':loading')} downloading :bar :rate/bps :percent :etas`, { total: len });
  }
  response.on('data', (chunk) => {
    if (bar) {
      bar.tick(chunk.length);
    }
  });
  response.on('end', () => {
    debug('finish download.');
  });
  
  return await new Promise((resolve, reject) => response.pipe(unzipper.Extract({ path: outputDir })).on('error', err => {
    if (bar) {
      bar.interrupt(err);
    }
    reject(err);
  }).on('finish', () => {
    const sourcePath = path.join(repoDir, repoUrl.split('/').pop().replace('.git', '') + '-master');
    const cachePath = path.join(repoDir, '..', `.fun-init-cache-${uuid.v1()}`);
    fs.moveSync(sourcePath, cachePath);
    fs.moveSync(cachePath, repoDir, { overwrite: true });
    resolve();
  }));

}