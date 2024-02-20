function padToN(number, digits) {

    var i;
    var stringMax = "";
    var stringLeading = "";
    for (i = 1; i <= digits; i++) {
      stringMax = stringMax + "9";
      if (i != digits) stringLeading = stringLeading + "0";
    }
    var numMax = parseInt(stringMax);

    if (number <= numMax) {
      number = (stringLeading + number).slice(-digits);
    }
    //console.log ("PADTON: returning " + number);
    return number;
  }