function readNumberArray(str, index) {
    var start = index;
    while (str[index++] != '[')
      start++;
    start++;

    var count = 0;
    while (str[index++] != ']')
      count++;

    str = str.substr(start, count);

    str = str.trim();
    // Remove adjacent spaces
    str = str.replace(/\s+/g, ' ');

    var array = str.split(' ');
    for (var i = 0, ii = array.length; i < ii; i++)
      array[i] = parseFloat(array[i] || 0);
    return array;
  }