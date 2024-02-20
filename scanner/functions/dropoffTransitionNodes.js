function dropoffTransitionNodes() {
      var links = force.links().map(function(link) {
        if (link.source.index === 0) {
          link.source = nodes[3]
          link.target.style = 'secondary'
        }
        if (link.source.index === 1) {
          link.source = nodes[2]
          link.target.style = 'primary'
        }
        return link
      })
      force.links(links)
    }