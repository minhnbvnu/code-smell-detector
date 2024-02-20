function uploadProgress(params) {

  const parmasStr = JSON.stringify(params);
  const paramsBuffer = Buffer.from(parmasStr);

  const readableStream = readableStreamInstance(paramsBuffer);

  if (!process.stdin.isTTY) {
    return readableStream;
  }

  const str = progress({
    time: 500,
    length: parmasStr.length
  });

  const total = Math.round(paramsBuffer.length / 1024);

  const bar = createProgressBar(`${green(':uploading')} :bar :current/:total :rate KB/s, :percent :etas`, { total });

  str.on('progress', (progress) => {
    bar.tick(Math.round(progress.delta / 1024)); // Δ
  });

  return readableStream.pipe(str);
}