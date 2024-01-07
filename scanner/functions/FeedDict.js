function FeedDict(feeds) {
	    this.id2Value = {};
	    this.id2Mask = {};
	    this.name2Id = {};

	    if (feeds instanceof FeedDict) {
	      for (var id in feeds.id2Value) {
	        this.id2Value[id] = feeds.id2Value[id];

	        if (id in feeds.id2Mask) {
	          this.id2Mask[id] = feeds.id2Mask[id];
	        }
	      }
	    } else {
	      if (feeds == null) {
	        return;
	      }

	      for (var _iterator = _createForOfIteratorHelperLoose(feeds), _step; !(_step = _iterator()).done;) {
	        var feed = _step.value;
	        this.add(feed.key, feed.value);
	      }
	    }
	  }