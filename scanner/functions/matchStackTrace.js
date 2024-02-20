function matchStackTrace(stackMatch, stackTrace) {
        if (!stackMatch || stackMatch === "") {
          return true;
        }
        if (shouldAbortInlineOrInjectedScript(stackMatch, stackTrace)) {
          return true;
        }
        var stackRegexp = toRegExp(stackMatch);
        var refinedStackTrace = stackTrace.split("\n").slice(2).map(function (line) {
          return line.trim();
        }).join("\n");
        return getNativeRegexpTest().call(stackRegexp, refinedStackTrace);
      }