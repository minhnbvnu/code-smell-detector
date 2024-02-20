function getExtraPairs(names) {
    let pairs = decodeURIComponent(location.search.substr(1)).split("&"),
      pairsObj = {},
      pair,
      i;

    if (pairs.length == 1 && pairs[0] == "") {
      return false;
    }

    for (i in pairs) {
      if (pairs[i] === "") continue;

      pair = pairs[i].split("=");
      pairsObj[pair[0]] = pair[1];
    }

    names.forEach(function(item) {
      delete pairsObj[item];
    });

    return pairsObj;
  }