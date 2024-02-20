function pointsToKeys(points) {
      var keysBySet = {};
      for (var i = 0; i < points.length; i++) {
        
        var trace = graphDiv.data[points[i].curveNumber];
        if (!trace.key || !trace.set) {
          continue;
        }
        
        // set defaults for this keySet
        // note that we don't track the nested property (yet) since we always 
        // emit the union -- http://cpsievert.github.io/talks/20161212b/#21
        keysBySet[trace.set] = keysBySet[trace.set] || {
          value: [],
          _isSimpleKey: trace._isSimpleKey
        };
        
        // Use pointNumber by default, but aggregated traces should emit pointNumbers
        var ptNum = points[i].pointNumber;
        var hasPtNum = typeof ptNum === "number";
        var ptNum = hasPtNum ? ptNum : points[i].pointNumbers;
        
        // selecting a point of a "simple" trace means: select the 
        // entire key attached to this trace, which is useful for,
        // say clicking on a fitted line to select corresponding observations 
        var key = trace._isSimpleKey ? trace.key : Array.isArray(ptNum) ? ptNum.map(function(idx) { return trace.key[idx]; }) : trace.key[ptNum];
        // http://stackoverflow.com/questions/10865025/merge-flatten-an-array-of-arrays-in-javascript
        var keyFlat = trace._isNestedKey ? [].concat.apply([], key) : key;
        
        // TODO: better to only add new values?
        keysBySet[trace.set].value = keysBySet[trace.set].value.concat(keyFlat);
      }
      
      return keysBySet;
    }