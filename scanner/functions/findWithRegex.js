function findWithRegex(regex, contentBlock, callback) {
	  // Get the text from the contentBlock
	  var text = contentBlock.getText();
	  var matchArr = void 0;
	  var start = void 0; // eslint-disable-line
	  // Go through all matches in the text and return the indizes to the callback
	  while ((matchArr = regex.exec(text)) !== null) {
	    // eslint-disable-line
	    start = matchArr.index;
	    callback(start, start + matchArr[0].length);
	  }
	}