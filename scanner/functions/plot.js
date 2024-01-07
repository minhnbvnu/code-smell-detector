function plot(resolution, counts, threshold) {
  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(counts.values)])
    .range([0, plotHeight]);

  const bar = chart.selectAll('rect').data(counts.values);

  bar.enter().append('rect');

  bar
    .attr('class', function (count, index) {
      const value = counts.min + index * counts.delta;
      return 'bar' + (value >= threshold ? ' selected' : '');
    })
    .attr('width', barWidth - 2);

  bar
    .transition()
    .attr('transform', function (value, index) {
      return (
        'translate(' +
        index * barWidth +
        ', ' +
        (plotHeight - yScale(value)) +
        ')'
      );
    })
    .attr('height', yScale);

  bar.on('mousemove', function () {
    const index = bar.nodes().indexOf(this);
    const threshold = counts.min + index * counts.delta;
    if (raster.get('threshold') !== threshold) {
      raster.set('threshold', threshold);
      raster.changed();
    }
  });

  bar.on('mouseover', function (event) {
    const index = bar.nodes().indexOf(this);
    let area = 0;
    for (let i = counts.values.length - 1; i >= index; --i) {
      area += resolution * resolution * counts.values[i];
    }
    tip.html(message(counts.min + index * counts.delta, area));
    tip.style('display', 'block');
    tip
      .transition()
      .style('left', chartRect.left + index * barWidth + barWidth / 2 + 'px')
      .style('top', event.y - 60 + 'px')
      .style('opacity', 1);
  });

  bar.on('mouseout', function () {
    tip
      .transition()
      .style('opacity', 0)
      .on('end', function () {
        tip.style('display', 'none');
      });
  });
}