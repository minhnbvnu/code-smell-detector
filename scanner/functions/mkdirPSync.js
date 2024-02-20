function mkdirPSync(p) {

  try {
    fs.mkdirSync(p);
  }
  catch (err0) {
    console.error('error: ', err0);

    switch (err0.code) {
    case 'ENOENT' :
      mkdirPSync(path.dirname(p));
      mkdirPSync(p);
      break;

    default:
      var stat;
      try {
        stat = fs.statSync(p);
      }
      catch (err1) {
        throw err0;
      }
      if (!stat.isDirectory()) { throw err0; }
      break;
    }
  }
}