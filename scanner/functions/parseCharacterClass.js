function parseCharacterClass() {
	      // CharacterClass ::
	      //      [ [lookahead ∉ {^}] ClassRanges ]
	      //      [ ^ ClassRanges ]

	      var res,
	          from = pos;
	      if (res = matchReg(/^\[\^/)) {
	        res = parseClassRanges();
	        skip(']');
	        return createCharacterClass(res, true, from, pos);
	      } else if (match('[')) {
	        res = parseClassRanges();
	        skip(']');
	        return createCharacterClass(res, false, from, pos);
	      }

	      return null;
	    }