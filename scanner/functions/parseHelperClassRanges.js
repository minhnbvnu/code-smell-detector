function parseHelperClassRanges(atom) {
	      var from, to, res;
	      if (current('-') && !next(']')) {
	        // ClassAtom - ClassAtom ClassRanges
	        skip('-');

	        res = parseClassAtom();
	        if (!res) {
	          bail('classAtom');
	        }
	        to = pos;
	        var classRanges = parseClassRanges();
	        if (!classRanges) {
	          bail('classRanges');
	        }
	        from = atom.range[0];
	        if (classRanges.type === 'empty') {
	          return [createClassRange(atom, res, from, to)];
	        }
	        return [createClassRange(atom, res, from, to)].concat(classRanges);
	      }

	      res = parseNonemptyClassRangesNoDash();
	      if (!res) {
	        bail('nonEmptyClassRangesNoDash');
	      }

	      return [atom].concat(res);
	    }