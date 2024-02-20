async function concatFiles(sourceDir, targetPath) {
  const readFile = (file, ws) =>
    new Promise((resolve, reject) => {
      fs.createReadStream(file)
        .on("data", (data) => ws.write(data))
        .on("end", resolve)
        .on("error", reject);
    });
  const files = await readdir(sourceDir);
  const sortedFiles = files
    .filter((file) => {
      return IGNORES.indexOf(file) === -1;
    })
    .sort((a, b) => a - b);
  const writeStream = fs.createWriteStream(targetPath);
  for (const file of sortedFiles) {
    let filePath = path.join(sourceDir, file);
    await readFile(filePath, writeStream);
    await unlink(filePath); // 删除已合并的分块
  }
  writeStream.end();
}