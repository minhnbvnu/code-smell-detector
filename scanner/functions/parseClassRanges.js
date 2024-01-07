function parseClassRanges() {
	      // ClassRanges ::
	      //      [empty]
	      //      NonemptyClassRanges

	      var res;
	      if (current(']')) {
	        // Empty array means nothing insinde of the ClassRange.
	        return [];
	      } else {
	        res = parseNonemptyClassRanges();
	        if (!res) {
	          bail('nonEmptyClassRanges');
	        }
	        return res;
	      }
	    }