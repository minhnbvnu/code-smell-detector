function encodeEntityRanges(block, storageMap) {
	  var encoded = [];
	  block.findEntityRanges(function (character) {
	    return !!character.getEntity();
	  }, function ( /*number*/start, /*number*/end) {
	    var text = block.getText();
	    var key = block.getEntityAt(start);
	    encoded.push({
	      offset: strlen(text.slice(0, start)),
	      length: strlen(text.slice(start, end)),
	      // Encode the key as a number for range storage.
	      key: Number(storageMap[DraftStringKey.stringify(key)])
	    });
	  });
	  return encoded;
	}