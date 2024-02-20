async function outputFunctionCode(serviceName, functionName, fullOutputDir) {
  const fc = await getFcClient();
  const { data } = await fc.getFunctionCode(serviceName, functionName);
  const response = await httpx.request(data.url, { timeout: 36000000, method: 'GET' }); // 10 hours
  const len = parseInt(response.headers['content-length'], 10);    
  const bar = createProgressBar(`${green(':loading')} ${functionName} downloading :bar :rate/bps :percent :etas`, { total: len });
  response.on('data', (chunk) => {
    bar.tick(chunk.length);
  });
  response.on('end', () => {
    console.log(`    ${green('✔')} ${functionName} - ${grey('Function')}`);
  });
  const fullTargetCodeDir = path.join(fullOutputDir, serviceName, functionName);
  return await new Promise((resolve, reject) => {
    response.pipe(unzipper.Extract({ path: fullTargetCodeDir })).on('error', err => {
      bar.interrupt(err);
      reject(err);
    }).on('finish', resolve);
  });
}