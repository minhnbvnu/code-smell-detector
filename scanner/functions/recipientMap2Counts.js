function recipientMap2Counts(recipientMap) {
	  var recipientCounts = {};

	  for (var name in recipientMap) {
	    recipientCounts[name] = recipientMap[name].size;
	  }

	  return recipientCounts;
	}