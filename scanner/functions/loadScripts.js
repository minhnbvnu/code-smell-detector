function loadScripts(transformFn, scripts) {
	  var result = [];
	  var count = scripts.length;

	  function check() {
	    var script, i;

	    for (i = 0; i < count; i++) {
	      script = result[i];

	      if (script.loaded && !script.executed) {
	        script.executed = true;
	        run(transformFn, script);
	      } else if (!script.loaded && !script.error && !script.async) {
	        break;
	      }
	    }
	  }

	  scripts.forEach(function (script, i) {
	    var scriptData = {
	      // script.async is always true for non-JavaScript script tags
	      async: script.hasAttribute('async'),
	      error: false,
	      executed: false,
	      plugins: getPluginsOrPresetsFromScript(script, 'data-plugins'),
	      presets: getPluginsOrPresetsFromScript(script, 'data-presets')
	    };

	    if (script.src) {
	      result[i] = _extends({}, scriptData, {
	        content: null,
	        loaded: false,
	        url: script.src
	      });

	      load(script.src, function (content) {
	        result[i].loaded = true;
	        result[i].content = content;
	        check();
	      }, function () {
	        result[i].error = true;
	        check();
	      });
	    } else {
	      result[i] = _extends({}, scriptData, {
	        content: script.innerHTML,
	        loaded: true,
	        url: null
	      });
	    }
	  });

	  check();
	}