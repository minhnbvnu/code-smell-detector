function parseDecimalEscape() {
	      // DecimalEscape ::
	      //      DecimalIntegerLiteral [lookahead ∉ DecimalDigit]
	      //      CharacterClassEscape :: one of d D s S w W

	      var res, match;

	      if (res = matchReg(/^(?!0)\d+/)) {
	        match = res[0];
	        var refIdx = parseInt(res[0], 10);
	        if (refIdx <= closedCaptureCounter) {
	          // If the number is smaller than the normal-groups found so
	          // far, then it is a reference...
	          return createReference(res[0]);
	        } else {
	          // ... otherwise it needs to be interpreted as a octal (if the
	          // number is in an octal format). If it is NOT octal format,
	          // then the slash is ignored and the number is matched later
	          // as normal characters.

	          // Recall the negative decision to decide if the input must be parsed
	          // a second time with the total normal-groups.
	          backrefDenied.push(refIdx);

	          // Reset the position again, as maybe only parts of the previous
	          // matched numbers are actual octal numbers. E.g. in '019' only
	          // the '01' should be matched.
	          incr(-res[0].length);
	          if (res = matchReg(/^[0-7]{1,3}/)) {
	            return createEscaped('octal', parseInt(res[0], 8), res[0], 1);
	          } else {
	            // If we end up here, we have a case like /\91/. Then the
	            // first slash is to be ignored and the 9 & 1 to be treated
	            // like ordinary characters. Create a character for the
	            // first number only here - other number-characters
	            // (if available) will be matched later.
	            res = createCharacter(matchReg(/^[89]/));
	            return updateRawStart(res, res.range[0] - 1);
	          }
	        }
	      }
	      // Only allow octal numbers in the following. All matched numbers start
	      // with a zero (if the do not, the previous if-branch is executed).
	      // If the number is not octal format and starts with zero (e.g. `091`)
	      // then only the zeros `0` is treated here and the `91` are ordinary
	      // characters.
	      // Example:
	      //   /\091/.exec('\091')[0].length === 3
	      else if (res = matchReg(/^[0-7]{1,3}/)) {
	          match = res[0];
	          if (/^0{1,3}$/.test(match)) {
	            // If they are all zeros, then only take the first one.
	            return createEscaped('null', 0x0000, '0', match.length + 1);
	          } else {
	            return createEscaped('octal', parseInt(match, 8), match, 1);
	          }
	        } else if (res = matchReg(/^[dDsSwW]/)) {
	          return createCharacterClassEscape(res[0]);
	        }
	      return false;
	    }