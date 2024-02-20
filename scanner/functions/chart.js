function chart(s) {

      selection = s;

      if (!arguments.length) return chart;

      selection.each(function(data) {

        var svg = d3.select(this)
          .append("svg:svg")
          .attr("width", w)
          .attr("height", h)
          .attr("class", "partition d3-flame-graph")
          .call(tip);

        svg.append("svg:text")
          .attr("class", "title")
          .attr("text-anchor", "middle")
          .attr("y", "25")
          .attr("x", w/2)
          .attr("fill", "#808080")
          .text(title);

        augment(data);

        // "creative" fix for node ordering when partition is called for the first time
        partition(data);

        // first draw
        update();

      });
    }