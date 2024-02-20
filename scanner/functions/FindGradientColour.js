function FindGradientColour(tc, p, r) {
  var l = 1024, h = 1, gl = tc.weightGradient, cv, c, i, d;
  if(tc.gCanvas) {
    c = tc.gCanvas.getContext('2d');
    h = tc.gCanvas.height;
  } else {
    if(IsObject(gl[0]))
      h = gl.length;
    else
      gl = [gl];
    tc.gCanvas = cv = NewCanvas(l, h);
    if(!cv)
      return null;
    c = cv.getContext('2d');
    for(i = 0; i < h; ++i)
      SetGradient(c, l, i, gl[i]);
  }
  r = max(min(r || 0, h - 1), 0);
  d = c.getImageData(~~((l - 1) * p), r, 1, 1).data;
  return 'rgba(' + d[0] + ',' + d[1] + ',' + d[2] + ',' + (d[3]/255) + ')';
}