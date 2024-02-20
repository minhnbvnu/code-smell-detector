function replaceFileLine(filepath, match, to) {
  let file = fs.readFileSync(filepath, { encoding: 'utf8' });
  let count = 0;

  // file 按行分隔，如果匹配match，则替换为to
  file = file
    .split('\n')
    .map(function (line) {
      if (match.test(line)) {
        count += 1;
        return to;
      }
      return line;
    })
    .join('\n');

  if (count) {
    fs.writeFileSync(filepath, file);
  }
}