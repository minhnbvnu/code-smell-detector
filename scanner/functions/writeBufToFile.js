function writeBufToFile(dstPath, buf, start) {
  return new Promise((resolve, reject) => {
    const ws = fs.createWriteStream(dstPath, {start: start, flags: 'r+'});
    ws.write(buf);
    ws.end();
    ws.on('finish', () => {
      console.log(`${dstPath} wirte done`);
      resolve();
    });
    ws.on('error', (error) => {
      console.log(`${dstPath} write error : ${error}`);
      reject(error);
    });
  });
}