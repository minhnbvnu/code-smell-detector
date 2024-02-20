function generateSassPath (fp, imports) {
  var res = [];
  imports.forEach(function (item) {
    var find = glob.sync(path.join(fp, '**', '?(_)' + item + '.+(scss|sass)'), {});
    res = res.concat(find);
  });
  return res;
}