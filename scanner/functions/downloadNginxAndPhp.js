async function downloadNginxAndPhp(codeDir) {
  const dotFunPath = path.join(codeDir, '.fun');
  let zipName = await fs.readFile(path.join(__dirname, '..', 'support', 'php', 'ZIPNAME'), 'utf8');
  zipName = zipName.split(/\r?\n/)[0];
  const url = `https://gosspublic.alicdn.com/fun/frameworks/support/${zipName}`;
  const downloadPath = path.join(tmpDir, zipName);
  
  console.log(`downloading nginx and php7.2 zip from ${url} to ${downloadPath}...`);

  if (!await fs.pathExists(downloadPath)) {
    const writeStream = fs.createWriteStream(downloadPath);
  
    const response = await httpx.request(url, { timeout: 36000000, method: 'GET' }); // 10 hours
    await new Promise((resolve, reject) => {
      response.pipe(writeStream).on('error', err => {
        fs.removeSync(downloadPath);
        reject(err);
      }).on('finish', resolve);
    });
  }

  console.log('extract nginx and php7.2 zip to custom runtime...');
  await zip.extractZipTo(downloadPath, dotFunPath);
}