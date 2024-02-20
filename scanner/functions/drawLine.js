function drawLine(i, series) {
        var line = d3.svg.line()
            .x(function(d) { return x(d[options.xAxis]); })
            .y(function(d) { return y(d[series]); });

        svg.append("path")
          .datum(data)
          .attr("class", "chart-line")
          .style('stroke', function (d) {
              return colors(i);
          })
          .attr("d", line);
    }