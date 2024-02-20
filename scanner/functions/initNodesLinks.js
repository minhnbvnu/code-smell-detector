function initNodesLinks(a, b) {
      var setPos = true, n = a + b
      var nodes = d3.range(n + 4).map(function(d, i) {
        var node = { charge: -30 }
        if(setPos) node.y = h * 0.5 + 100 * random() - 50
        if (i < 4)
          extend(node, { fixed: true, style: 'tertiary', charge: 0 })
        else if ( (i - 4) < a ) {
          node.style = 'primary'
          if (setPos) node.x = lC + 100 * random() - 50
        } else {
          node.style = 'secondary'
          if (setPos) node.x = rC + 100 * random() - 50
        }
        return node
      })
      var links = nodes.slice(4)
        .map(function(d, i) { return {
          source: d.style === 'primary' ? 2 : 3, target: i + 4 }
        })
      return { nodes: nodes, links: links }
    }