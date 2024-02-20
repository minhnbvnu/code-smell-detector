function filledPath(interpolator) {

  return function drawCurve(context, data, options) {

    context.fillStyle = options.waveColor;
    context.strokeStyle = options.waveColor;
    context.lineWidth = 3;

    var line = d3.line()
      .context(context);

    if (interpolator) {
      line.curve(interpolator);
    }

    var waveHeight = options.waveBottom - options.waveTop;

    var baseline = options.waveTop + waveHeight / 2;

    var x = d3.scalePoint()
      .padding(0.1)
      .domain(d3.range(data.length))
      .rangeRound([options.waveLeft, options.waveRight]);

    var height = d3.scaleLinear()
      .domain([0, 1])
      .range([0, waveHeight / 2]);

    var top = data.map(function(d,i){

      return [x(i), baseline - height(d[0])];

    });

    var bottom = data.map(function(d,i){

      return [x(i), baseline + height(d[0])];

    }).reverse();

    top.unshift([options.waveLeft, baseline]);
    top.push([options.waveRight, baseline]);

    // Fill waveform
    context.beginPath();
    line(top.concat(bottom));
    context.fill();

    // Stroke waveform edges / ensure baseline
    [top, bottom].forEach(function(path){

      context.beginPath();
      line(path);
      context.stroke();

    });
  }

}