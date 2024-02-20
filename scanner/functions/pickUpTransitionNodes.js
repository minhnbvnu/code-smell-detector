function pickUpTransitionNodes() {
      var ratioAStay = scope.opts.basis1[0]
      var ratioBStay = scope.opts.basis2[1]
      var links = force.links()
      var sideALinks = links
        .filter(function(link) { return link.source === nodes[2] })
        .sort(function(a, b) { return b.target.y - a.target.y })
      sideALinks.forEach(function(link, i) {
        if (i >= ratioAStay * sideALinks.length) {
          link.source = nodes[0] // moving `A`
        }
      })
      var sideBLinks = links
        .filter(function(link) { return link.source === nodes[3] })
        .sort(function(a, b) { return a.target.y - b.target.y })
      sideBLinks.forEach(function(link, i) {
        if (i >= ratioBStay * sideBLinks.length) {
          link.source = nodes[1] // moving `B`
        }
      })
      force.links(links)
    }