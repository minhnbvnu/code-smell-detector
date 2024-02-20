function readLines(fileName) {
  return new Promise((resolve, reject) => {
    const lines = [];

    readline.createInterface({input: fs.createReadStream(fileName)})
      .on('line', line => lines.push(line))
      .on('close', () => resolve(lines))
      .on('error', reject);
  });
}