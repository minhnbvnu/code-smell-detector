function parseAtom() {
	      // Atom ::
	      //      PatternCharacter
	      //      .
	      //      \ AtomEscape
	      //      CharacterClass
	      //      ( Disjunction )
	      //      ( ? : Disjunction )

	      var res;

	      // jviereck: allow ']', '}' here as well to be compatible with browser's
	      //   implementations: ']'.match(/]/);
	      // if (res = matchReg(/^[^^$\\.*+?()[\]{}|]/)) {
	      if (res = matchReg(/^[^^$\\.*+?(){[|]/)) {
	        //      PatternCharacter
	        return createCharacter(res);
	      } else if (match('.')) {
	        //      .
	        return createDot();
	      } else if (match('\\')) {
	        //      \ AtomEscape
	        res = parseAtomEscape();
	        if (!res) {
	          bail('atomEscape');
	        }
	        return res;
	      } else if (res = parseCharacterClass()) {
	        return res;
	      } else {
	        //      ( Disjunction )
	        //      ( ? : Disjunction )
	        return parseGroup('(?:', 'ignore', '(', 'normal');
	      }
	    }