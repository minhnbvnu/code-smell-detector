function parseAtomEscape(insideCharacterClass) {
	      // AtomEscape ::
	      //      DecimalEscape
	      //      CharacterEscape
	      //      CharacterClassEscape

	      var res,
	          from = pos;

	      res = parseDecimalEscape();
	      if (res) {
	        return res;
	      }

	      // For ClassEscape
	      if (insideCharacterClass) {
	        if (match('b')) {
	          // 15.10.2.19
	          // The production ClassEscape :: b evaluates by returning the
	          // CharSet containing the one character <BS> (Unicode value 0008).
	          return createEscaped('singleEscape', 0x0008, '\\b');
	        } else if (match('B')) {
	          bail('\\B not possible inside of CharacterClass', '', from);
	        }
	      }

	      res = parseCharacterEscape();

	      return res;
	    }