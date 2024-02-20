function toNotationHelper(time, bpm, timeSignature, testNotations) {
    var seconds = this.toSeconds(time);
    var threshold = this.notationToSeconds(testNotations[testNotations.length - 1], bpm, timeSignature);
    var retNotation = '';
    for (var i = 0; i < testNotations.length; i++) {
      var notationTime = this.notationToSeconds(testNotations[i], bpm, timeSignature);
      var multiple = seconds / notationTime;
      var floatingPointError = 0.000001;
      if (1 - multiple % 1 < floatingPointError) {
        multiple += floatingPointError;
      }
      multiple = Math.floor(multiple);
      if (multiple > 0) {
        if (multiple === 1) {
          retNotation += testNotations[i];
        } else {
          retNotation += multiple.toString() + '*' + testNotations[i];
        }
        seconds -= multiple * notationTime;
        if (seconds < threshold) {
          break;
        } else {
          retNotation += ' + ';
        }
      }
    }
    if (retNotation === '') {
      retNotation = '0';
    }
    return retNotation;
  }