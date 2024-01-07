function parseIdentityEscape() {
	      // IdentityEscape ::
	      //      SourceCharacter but not IdentifierPart
	      //      <ZWJ>
	      //      <ZWNJ>

	      var ZWJ = '\u200C';
	      var ZWNJ = '\u200D';

	      var tmp;

	      if (!isIdentifierPart(lookahead())) {
	        tmp = incr();
	        return createEscaped('identifier', tmp.charCodeAt(0), tmp, 1);
	      }

	      if (match(ZWJ)) {
	        // <ZWJ>
	        return createEscaped('identifier', 0x200C, ZWJ);
	      } else if (match(ZWNJ)) {
	        // <ZWNJ>
	        return createEscaped('identifier', 0x200D, ZWNJ);
	      }

	      return null;
	    }