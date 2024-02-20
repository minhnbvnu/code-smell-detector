function Command(input, params, outputfile) {

  params = new Params(params);

  var output = this;

  output.scale = 1;
  output.format = 'png';
  output.quality = 100;
  output.mode = 'crop'; // slice

  params.first(/^(\d+)\%$/i, function(match) {
    output.quality = parseInt(match[1]);
  });

  params.first(/^(jpeg|jpg)$/i, function(match) {
    output.format = match[1];
  }, function() {
    if (outputfile) {
      var ext = /.(jpeg|jpg)$/.exec(outputfile);
      if (ext && ext[1]) {
        output.format = ext[1];
      }
    }
  });

  output.format = output.format.toLowerCase().replace('jpg', 'jpeg');

  // output
  params.last(/^([0-9.]+)x$/i, function(match) {
    // <scale>x
    output.scale = parseFloat(match[1]);

  }) || params.last(/^(\d+):$/i, function(match) {
    // <width>:
    output.width = parseInt(match[1]);

  }) || params.last(/^:(\d+)$/i, function(match) {
    // :<height>
    output.height = parseInt(match[1]);

  }) || params.last(/^(\d+):(\d+)$/i, function(match) {
    // <width>:<height>
    output.width = parseInt(match[1]);
    output.height = parseInt(match[2]);
  });

  // input
  params.last(/^((-?\d+):(-?\d+):)?(\d+):(\d+)$/i, function(match) {
    input = {
      left : parseInt(match[2]) || 0,
      top : parseInt(match[3]) || 0,
      width : parseInt(match[4]),
      height : parseInt(match[5])
    };
  });

  // crop mode
  params.first(/^(pad|meet)$/i, function(match) {
    output.mode = 'pad';
  });

  // css style
  params.first(/^([^{}]+\s*\{[^{}]*\}\s*)+$/i, function(match) {
    output.css = match[0];
  });

  var resized = resize(input, output);
  this.scale = resized.scale;
  this.width = resized.width;
  this.height = resized.height;
  this.left = resized.left;
  this.top = resized.top;
}