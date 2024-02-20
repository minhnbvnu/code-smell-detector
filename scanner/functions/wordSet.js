function wordSet(words) {
    var set = {}
    for (var i = 0; i < words.length; i++) set[words[i]] = true
    return set
  }