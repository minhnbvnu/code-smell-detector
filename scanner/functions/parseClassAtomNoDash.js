function parseClassAtomNoDash() {
	      // ClassAtomNoDash ::
	      //      SourceCharacter but not one of \ or ] or -
	      //      \ ClassEscape

	      var res;
	      if (res = matchReg(/^[^\\\]-]/)) {
	        return createCharacter(res[0]);
	      } else if (match('\\')) {
	        res = parseClassEscape();
	        if (!res) {
	          bail('classEscape');
	        }

	        return parseUnicodeSurrogatePairEscape(res);
	      }
	    }