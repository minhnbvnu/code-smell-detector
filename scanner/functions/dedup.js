function dedup(edges) {
        var j = edges.length,
            a, b, i, m, n

        outer: while(j) {
          b = edges[--j]
          a = edges[--j]
          i = j
          while(i) {
            n = edges[--i]
            m = edges[--i]
            if((a === m && b === n) || (a === n && b === m)) {
              edges.splice(j, 2)
              edges.splice(i, 2)
              j -= 2
              continue outer
            }
          }
        }
      }