function findFutureState($state, options) {
      if (options.name) {
        var nameComponents = options.name.split(/\./);
        if (options.name.charAt(0) === '.')
          nameComponents[0] = $state.current.name;
        while (nameComponents.length) {
          var stateName = nameComponents.join(".");
          if ($state.get(stateName, { relative: $state.current }))
            return null; // State is already defined; nothing to do
          if (futureStates[stateName])
            return futureStates[stateName];
          nameComponents.pop();
        }
      }

      if (options.url) {
        var matches = [];
        for(var future in futureStates) {
          var matcher = futureStates[future].urlMatcher;
          if (matcher && matcher.exec(options.url)) {
            matches.push(futureStates[future]);
          }
        }
        // Find most specific by ignoring matching parents from matches
        var copy = matches.slice(0);
        for (var i = matches.length - 1; i >= 0; i--) {
          for (var j = 0; j < copy.length; j++) {
            if (matches[i] === copy[j].parentFutureState) matches.splice(i, 1);
          }
        }
        return matches[0];
      }
    }