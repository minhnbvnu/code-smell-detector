function Exec(re, string) {
    var sum = 0;
    re.lastIndex = 0;
    var array = re.exec(string);
    if (array) {
      for (var i = 0; i < array.length; i++) {
        var substring = array[i];
        if (substring) sum += substring.length;
      }
    }
    return sum;
  }