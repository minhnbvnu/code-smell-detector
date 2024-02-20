function uniqInStr(str) {
    let uniq = String(Math.random()).slice(2);
    while (str.indexOf(uniq) > -1) {
      uniq += uniq;
    }
    return uniq;
  }