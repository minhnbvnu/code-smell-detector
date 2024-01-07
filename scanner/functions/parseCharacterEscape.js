function parseCharacterEscape() {
	      // CharacterEscape ::
	      //      ControlEscape
	      //      c ControlLetter
	      //      HexEscapeSequence
	      //      UnicodeEscapeSequence
	      //      IdentityEscape

	      var res;
	      if (res = matchReg(/^[fnrtv]/)) {
	        // ControlEscape
	        var codePoint = 0;
	        switch (res[0]) {
	          case 't':
	            codePoint = 0x009;break;
	          case 'n':
	            codePoint = 0x00A;break;
	          case 'v':
	            codePoint = 0x00B;break;
	          case 'f':
	            codePoint = 0x00C;break;
	          case 'r':
	            codePoint = 0x00D;break;
	        }
	        return createEscaped('singleEscape', codePoint, '\\' + res[0]);
	      } else if (res = matchReg(/^c([a-zA-Z])/)) {
	        // c ControlLetter
	        return createEscaped('controlLetter', res[1].charCodeAt(0) % 32, res[1], 2);
	      } else if (res = matchReg(/^x([0-9a-fA-F]{2})/)) {
	        // HexEscapeSequence
	        return createEscaped('hexadecimalEscape', parseInt(res[1], 16), res[1], 2);
	      } else if (res = matchReg(/^u([0-9a-fA-F]{4})/)) {
	        // UnicodeEscapeSequence
	        return parseUnicodeSurrogatePairEscape(createEscaped('unicodeEscape', parseInt(res[1], 16), res[1], 2));
	      } else if (hasUnicodeFlag && (res = matchReg(/^u\{([0-9a-fA-F]+)\}/))) {
	        // RegExpUnicodeEscapeSequence (ES6 Unicode code point escape)
	        return createEscaped('unicodeCodePointEscape', parseInt(res[1], 16), res[1], 4);
	      } else {
	        // IdentityEscape
	        return parseIdentityEscape();
	      }
	    }