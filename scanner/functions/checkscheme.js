function checkscheme(url) {

    if ((!/^(f|ht)tps?:\/\//i.test(url)) && (url != "")) {
      return false;
    } else
      return true;
  }