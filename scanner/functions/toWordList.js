function toWordList(words) {
    var ret = [];
    words.split(' ').forEach(function(e){
      ret.push({name: e});
    });
    return ret;
  }