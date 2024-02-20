function replaceFileText(filepath, replacerList) {
  let file = fs.readFileSync(filepath, { encoding: 'utf8' });
  let count = 0;

  // 对文件内容进行替换
  replacerList.forEach(function (replacer) {
    var res;
    // 支持字符串和正则的替换
    while ((res = file.match(replacer.from))) {
      count += 1;

      // 支持函数，支持替换中的正则引用 $0 $1 $2
      var to =
        typeof replacer.to === 'function'
          ? replacer.to
          : replacer.to.replace(/\$(\d+)/g, function (match, p1) {
              return res[p1] || '';
            });

      file = file.replace(replacer.from, to);
    }
  });

  if (count) {
    fs.writeFileSync(filepath, file);
  }
}