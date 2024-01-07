function normalizeOptions(code, opts, tokens) {
	  var style = "  ";
	  if (code && typeof code === "string") {
	    var indent = (0, _detectIndent2.default)(code).indent;
	    if (indent && indent !== " ") style = indent;
	  }

	  var format = {
	    auxiliaryCommentBefore: opts.auxiliaryCommentBefore,
	    auxiliaryCommentAfter: opts.auxiliaryCommentAfter,
	    shouldPrintComment: opts.shouldPrintComment,
	    retainLines: opts.retainLines,
	    retainFunctionParens: opts.retainFunctionParens,
	    comments: opts.comments == null || opts.comments,
	    compact: opts.compact,
	    minified: opts.minified,
	    concise: opts.concise,
	    quotes: opts.quotes || findCommonStringDelimiter(code, tokens),
	    jsonCompatibleStrings: opts.jsonCompatibleStrings,
	    indent: {
	      adjustMultilineComment: true,
	      style: style,
	      base: 0
	    },
	    flowCommaSeparator: opts.flowCommaSeparator
	  };

	  if (format.minified) {
	    format.compact = true;

	    format.shouldPrintComment = format.shouldPrintComment || function () {
	      return format.comments;
	    };
	  } else {
	    format.shouldPrintComment = format.shouldPrintComment || function (value) {
	      return format.comments || value.indexOf("@license") >= 0 || value.indexOf("@preserve") >= 0;
	    };
	  }

	  if (format.compact === "auto") {
	    format.compact = code.length > 500000;

	    if (format.compact) {
	      console.error("[BABEL] " + messages.get("codeGeneratorDeopt", opts.filename, "500KB"));
	    }
	  }

	  if (format.compact) {
	    format.indent.adjustMultilineComment = false;
	  }

	  return format;
	}