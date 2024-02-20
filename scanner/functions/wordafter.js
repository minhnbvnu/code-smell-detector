function wordafter(str) {
    var m = str.match(/,|[a-z]+|\}|\]|\)|>>|\|+|\(/);

    return truthy(m) && (m.index === 0) ? m[0] : "";
  }