function PressEvent(nativeEvent) {
	    var _this = this;

	    this.nativeEvent = nativeEvent;
	    ['type', 'currentTarget', 'target', 'touches', 'changedTouches'].forEach(function (m) {
	        _this[m] = nativeEvent[m];
	    });
	    if (!nativeEvent.$pressSeq) {
	        nativeEvent.$pressSeq = 1;
	    } else {
	        nativeEvent.$pressSeq += 1;
	    }
	    this.$pressSeq = nativeEvent.$pressSeq;
	}