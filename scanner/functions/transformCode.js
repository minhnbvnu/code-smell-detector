function transformCode(transformFn, script) {
	  var source = void 0;
	  if (script.url != null) {
	    source = script.url;
	  } else {
	    source = 'Inline Babel script';
	    inlineScriptCount++;
	    if (inlineScriptCount > 1) {
	      source += ' (' + inlineScriptCount + ')';
	    }
	  }

	  return transformFn(script.content, _extends({
	    filename: source
	  }, buildBabelOptions(script))).code;
	}