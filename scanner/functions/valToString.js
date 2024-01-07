function valToString(val, pad, dtype) {
	  var valStr;

	  if (Array.isArray(val)) {
	    valStr = parseFloat(val[0].toFixed(FORMAT_NUM_SIG_DIGITS)) + " + " + (parseFloat(val[1].toFixed(FORMAT_NUM_SIG_DIGITS)) + "j");
	  } else if (isString(val)) {
	    valStr = "'" + val + "'";
	  } else if (dtype === 'bool') {
	    valStr = boolNumToString(val);
	  } else {
	    valStr = parseFloat(val.toFixed(FORMAT_NUM_SIG_DIGITS)).toString();
	  }

	  return rightPad(valStr, pad);
	}