function parseNonemptyClassRangesNoDash() {
	      // NonemptyClassRangesNoDash ::
	      //      ClassAtom
	      //      ClassAtomNoDash NonemptyClassRangesNoDash
	      //      ClassAtomNoDash - ClassAtom ClassRanges

	      var res = parseClassAtom();
	      if (!res) {
	        bail('classAtom');
	      }
	      if (current(']')) {
	        //      ClassAtom
	        return res;
	      }

	      // ClassAtomNoDash NonemptyClassRangesNoDash
	      // ClassAtomNoDash - ClassAtom ClassRanges
	      return parseHelperClassRanges(res);
	    }