function logShaderSourceAndInfoLog(shaderSource, shaderInfoLog) {
	  var lineNumberRegexResult = lineNumberRegex.exec(shaderInfoLog);

	  if (lineNumberRegexResult == null) {
	    console.log("Couldn't parse line number in error: " + shaderInfoLog);
	    console.log(shaderSource);
	    return;
	  }

	  var lineNumber = +lineNumberRegexResult[1];
	  var shaderLines = shaderSource.split('\n');
	  var pad = shaderLines.length.toString().length + 2;
	  var linesWithLineNumbers = shaderLines.map(function (line, lineNumber) {
	    return rightPad((lineNumber + 1).toString(), pad) + line;
	  });
	  var maxLineLength = 0;

	  for (var i = 0; i < linesWithLineNumbers.length; i++) {
	    maxLineLength = Math.max(linesWithLineNumbers[i].length, maxLineLength);
	  }

	  var beforeErrorLines = linesWithLineNumbers.slice(0, lineNumber - 1);
	  var errorLine = linesWithLineNumbers.slice(lineNumber - 1, lineNumber);
	  var afterErrorLines = linesWithLineNumbers.slice(lineNumber);
	  console.log(beforeErrorLines.join('\n'));
	  console.log(shaderInfoLog.split('\n')[0]);
	  console.log("%c " + rightPad(errorLine[0], maxLineLength), 'border:1px solid red; background-color:#e3d2d2; color:#a61717');
	  console.log(afterErrorLines.join('\n'));
	}