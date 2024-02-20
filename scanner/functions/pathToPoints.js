function pathToPoints(cmds, options) {

  var opts = parseOpts(options, {
    sampleFactor: 0.1,
    simplifyThreshold: 0,
  });

  var len = pointAtLength(cmds,0,1), // total-length
    t = len / (len * opts.sampleFactor),
    pts = [];

  for (var i = 0; i < len; i += t) {
    pts.push(pointAtLength(cmds, i));
  }

  if (opts.simplifyThreshold) {
    /*var count = */simplify(pts, opts.simplifyThreshold);
    //console.log('Simplify: removed ' + count + ' pts');
  }

  return pts;
}