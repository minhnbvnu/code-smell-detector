function isContinuous(edges) {
      for (var i = 0; i < edges.length -1; ++i) {
        var edge = edges[i];
        var nextEdge = edges[i+1];
        if (! areConnected(edge, nextEdge)) {
          return false;
        }
      }
      return true;
    }