function getTooltipLayer() {
    var tooltipLayer = d3.select('body').select('.layer.ev-tooltips')
    if (!tooltipLayer.node()) {
      tooltipLayer = d3.select('body').append('div')
        .attr('class', 'layer ev-tooltips')
    }
    return tooltipLayer
  }