function strokedPath(interpolator) {
  return function(context, data, options) {

    context.fillStyle = options.waveColor;
    context.strokeStyle = options.waveColor;
    context.lineWidth = 5;

    var line = d3.line()
      .context(context);

    if (interpolator) {
      line.curve(interpolator);
    }

    var x = d3.scalePoint()
      .padding(0.1)
      .domain(d3.range(data.length))
      .range([options.waveLeft, options.waveRight]);

    var y = d3.scaleLinear()
      .domain([-1, 1])
      .range([options.waveBottom, options.waveTop]);

    var points = data.map(function(d, i){
      return [x(i), y(d[1])];
    });

    // Fill waveform
    context.beginPath();
    line(points);
    context.stroke();

  }
}