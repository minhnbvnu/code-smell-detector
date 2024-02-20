function resolveAutoHints(cm, pos) {
    var helpers = cm.getHelpers(pos, "hint"), words
    if (helpers.length) {
      var resolved = function(cm, callback, options) {
        var app = applicableHelpers(cm, helpers);
        function run(i) {
          if (i == app.length) return callback(null)
          fetchHints(app[i], cm, options, function(result) {
            if (result && result.list.length > 0) callback(result)
            else run(i + 1)
          })
        }
        run(0)
      }
      resolved.async = true
      resolved.supportsSelection = true
      return resolved
    } else if (words = cm.getHelper(cm.getCursor(), "hintWords")) {
      return function(cm) { return CodeMirror.hint.fromList(cm, {words: words}) }
    } else if (CodeMirror.hint.anyword) {
      return function(cm, options) { return CodeMirror.hint.anyword(cm, options) }
    } else {
      return function() {}
    }
  }