function initBake() {
      var objs = initNodesLinks(
        round(scope.opts.sample[0]) * 3,
        round(scope.opts.sample[1]) * 3
      )
      nodes = objs.nodes
      initFixedPointLocations()
      force.nodes(nodes)
        .links(objs.links)
        .on('tick', function() {})
        .start()
      for(var i = 0; i < 10; i++) force.tick()
      force.stop()
      redrawCanvas()
    }