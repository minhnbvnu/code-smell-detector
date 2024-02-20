function GetTag(data, data_off) {
    var str = "";
    for (var i = 0; i < 4; i++) str += String.fromCharCode(data[data_off++]);
    return str;
  }