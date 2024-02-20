function loadScripts(scripts) {
  var result = [];
  var count = scripts.length;

  function check() {
    var script, i;

    for (i = 0; i < count; i++) {
      script = result[i];

      if (script.loaded && !script.executed) {
        script.executed = true;
        run(script.content, script.url, script.options);
      } else if (!script.loaded && !script.error && !script.async) {
        break;
      }
    }
  }

  scripts.forEach(function(script, i) {
    var options = {
      // @philix: sourceMap support breaks r.js optimization. Leave it off by default
      sourceMap: false
    };
    if (/;harmony=true(;|$)/.test(script.type)) {
      options.harmony = true;
    }
    if (/;stripTypes=true(;|$)/.test(script.type)) {
      options.stripTypes = true;
    }

    // script.async is always true for non-javascript script tags
    var async = script.hasAttribute('async');

    if (script.src) {
      result[i] = {
        async: async,
        error: false,
        executed: false,
        content: null,
        loaded: false,
        url: script.src,
        options: options
      };

      load(script.src, function(content) {
        result[i].loaded = true;
        result[i].content = content;
        check();
      }, function() {
        result[i].error = true;
        check();
      });
    } else {
      result[i] = {
        async: async,
        error: false,
        executed: false,
        content: script.innerHTML,
        loaded: true,
        url: null,
        options: options
      };
    }
  });

  check();
}