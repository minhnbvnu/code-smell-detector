function horizontalCompaction(g, layering, pos, root, align) {
    var sink = {},       // Mapping of node id -> sink node id for class
        maybeShift = {}, // Mapping of sink node id -> { class node id, min shift }
        shift = {},      // Mapping of sink node id -> shift
        pred = {},       // Mapping of node id -> predecessor node (or null)
        xs = {};         // Calculated X positions

    layering.forEach(function(layer) {
      layer.forEach(function(u, i) {
        sink[u] = u;
        maybeShift[u] = {};
        if (i > 0)
          pred[u] = layer[i - 1];
      });
    });

    function updateShift(toShift, neighbor, delta) {
      if (!(neighbor in maybeShift[toShift])) {
        maybeShift[toShift][neighbor] = delta;
      } else {
        maybeShift[toShift][neighbor] = Math.min(maybeShift[toShift][neighbor], delta);
      }
    }

    function placeBlock(v) {
      if (!(v in xs)) {
        xs[v] = 0;
        var w = v;
        do {
          if (pos[w] > 0) {
            var u = root[pred[w]];
            placeBlock(u);
            if (sink[v] === v) {
              sink[v] = sink[u];
            }
            var delta = sep(g, pred[w]) + sep(g, w);
            if (sink[v] !== sink[u]) {
              updateShift(sink[u], sink[v], xs[v] - xs[u] - delta);
            } else {
              xs[v] = Math.max(xs[v], xs[u] + delta);
            }
          }
          w = align[w];
        } while (w !== v);
      }
    }

    // Root coordinates relative to sink
    util.values(root).forEach(function(v) {
      placeBlock(v);
    });

    // Absolute coordinates
    // There is an assumption here that we've resolved shifts for any classes
    // that begin at an earlier layer. We guarantee this by visiting layers in
    // order.
    layering.forEach(function(layer) {
      layer.forEach(function(v) {
        xs[v] = xs[root[v]];
        if (v === root[v] && v === sink[v]) {
          var minShift = 0;
          if (v in maybeShift && Object.keys(maybeShift[v]).length > 0) {
            minShift = util.min(Object.keys(maybeShift[v])
                                 .map(function(u) {
                                      return maybeShift[v][u] + (u in shift ? shift[u] : 0);
                                      }
                                 ));
          }
          shift[v] = minShift;
        }
      });
    });

    layering.forEach(function(layer) {
      layer.forEach(function(v) {
        xs[v] += shift[sink[root[v]]] || 0;
      });
    });

    return xs;
  }