function deleteFileLine(filepath, match) {
  let file = fs.readFileSync(filepath, { encoding: 'utf8' });
  let count = 0;

  // file 按行分隔，如果匹配match，则删除
  file = file
    .split('\n')
    .filter(function (line) {
      if (match.test(line)) {
        count += 1;
        return false;
      }
      return true;
    })
    .join('\n');

  if (count) {
    fs.writeFileSync(filepath, file);
  }
}