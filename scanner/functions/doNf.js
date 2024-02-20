function doNf() {
  var num = arguments[0];
  var neg = num < 0;
  var n = neg ? num.toString().substring(1) : num.toString();
  var decimalInd = n.indexOf('.');
  var intPart = decimalInd !== -1 ? n.substring(0, decimalInd) : n;
  var decPart = decimalInd !== -1 ? n.substring(decimalInd + 1) : '';
  var str = neg ? '-' : '';
  if (arguments.length === 3) {
    var decimal = '';
    if(decimalInd !== -1 || arguments[2] - decPart.length > 0){
      decimal = '.';
    }
    if (decPart.length > arguments[2]) {
      decPart = decPart.substring(0, arguments[2]);
    }
    for (var i = 0; i < arguments[1] - intPart.length; i++) {
      str += '0';
    }
    str += intPart;
    str += decimal;
    str += decPart;
    for (var j = 0; j < arguments[2] - decPart.length; j++) {
      str += '0';
    }
    return str;
  }
  else {
    for (var k = 0; k < Math.max(arguments[1] - intPart.length, 0); k++) {
      str += '0';
    }
    str += n;
    return str;
  }
}