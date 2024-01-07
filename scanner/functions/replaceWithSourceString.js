function replaceWithSourceString(replacement) {
	  this.resync();

	  try {
	    replacement = "(" + replacement + ")";
	    replacement = (0, _babylon.parse)(replacement);
	  } catch (err) {
	    var loc = err.loc;
	    if (loc) {
	      err.message += " - make sure this is an expression.";
	      err.message += "\n" + (0, _babelCodeFrame2.default)(replacement, loc.line, loc.column + 1);
	    }
	    throw err;
	  }

	  replacement = replacement.program.body[0].expression;
	  _index2.default.removeProperties(replacement);
	  return this.replaceWith(replacement);
	}