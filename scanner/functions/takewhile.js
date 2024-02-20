function takewhile(str,re) {
    var m = str.match(re);
    return m ? str.slice(0,m.index) : str;
  }