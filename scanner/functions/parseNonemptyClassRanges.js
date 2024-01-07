function parseNonemptyClassRanges() {
	      // NonemptyClassRanges ::
	      //      ClassAtom
	      //      ClassAtom NonemptyClassRangesNoDash
	      //      ClassAtom - ClassAtom ClassRanges

	      var atom = parseClassAtom();
	      if (!atom) {
	        bail('classAtom');
	      }

	      if (current(']')) {
	        // ClassAtom
	        return [atom];
	      }

	      // ClassAtom NonemptyClassRangesNoDash
	      // ClassAtom - ClassAtom ClassRanges
	      return parseHelperClassRanges(atom);
	    }