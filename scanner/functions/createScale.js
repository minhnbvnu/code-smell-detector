function createScale(data, options, dimensions) {
    var width = (dimensions && dimensions.width) || 400;
    var height = (dimensions && dimensions.height) || 50;

    options = options || {};
    options.type = 'time';
    options.id = 'xScale0';

    var chart = window.acquireChart({
      type: 'line',
      data: data,
      options: {
        scales: {
          x: options
        }
      }
    }, {canvas: {width: width, height: height}});


    return chart.scales.x;
  }