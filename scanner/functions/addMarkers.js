function addMarkers(defs) {
  var markers = defs.selectAll('marker')
    .data(Object.keys(color))
    .enter().append('marker')
    .attr({
      id: function(d) { return 'vector-head-' + d }
      , class: function(d) { return 'head-' + d }
      , orient: 'auto'
      , markerWidth: 8, markerHeight: 16
      , refX: 1.5, refY: 2
      , fill: function(d) {
        return color[d]
      }
    })
  markers.append('path').attr('d', 'M 0,0 V4 L2,2 Z')
}