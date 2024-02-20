function writeFileToLine(filePath, content, lineNum) {
  let data = fs.readFileSync(filePath, 'utf8').split(/\r?\n/gm);
  data.splice(lineNum, 0, content);
  fs.writeFileSync(filePath, data.join('\n'), {
    encoding: 'utf8'
  });
}