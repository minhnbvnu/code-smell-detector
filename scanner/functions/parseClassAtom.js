function parseClassAtom() {
	      // ClassAtom ::
	      //      -
	      //      ClassAtomNoDash
	      if (match('-')) {
	        return createCharacter('-');
	      } else {
	        return parseClassAtomNoDash();
	      }
	    }