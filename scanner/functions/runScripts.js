function runScripts(transformFn, scripts) {
	  headEl = document.getElementsByTagName('head')[0];
	  if (!scripts) {
	    scripts = document.getElementsByTagName('script');
	  }

	  // Array.prototype.slice cannot be used on NodeList on IE8
	  var jsxScripts = [];
	  for (var i = 0; i < scripts.length; i++) {
	    var script = scripts.item(i);
	    // Support the old type="text/jsx;harmony=true"
	    var type = script.type.split(';')[0];
	    if (scriptTypes.indexOf(type) !== -1) {
	      jsxScripts.push(script);
	    }
	  }

	  if (jsxScripts.length === 0) {
	    return;
	  }

	  console.warn('You are using the in-browser Babel transformer. Be sure to precompile ' + 'your scripts for production - https://babeljs.io/docs/setup/');

	  loadScripts(transformFn, jsxScripts);
	}