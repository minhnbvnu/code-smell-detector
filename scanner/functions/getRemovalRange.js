function getRemovalRange(characters, key, offset) {
	  var removalRange;
	  findRangesImmutable(characters, function (a, b) {
	    return a.getEntity() === b.getEntity();
	  }, function (element) {
	    return element.getEntity() === key;
	  }, function (start, end) {
	    if (start <= offset && end >= offset) {
	      removalRange = { start: start, end: end };
	    }
	  });
	  !(typeof removalRange === 'object') ?  true ? invariant(false, 'Removal range must exist within character list.') : invariant(false) : void 0;
	  return removalRange;
	}