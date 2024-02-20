function render_vector_shape(a) {
  var stroke = parseInt(a.stroke) + 4;
  var offset = stroke / 2;

  var xr = (a.w-stroke) / 2;
  var yr = (a.h-stroke) / 2;

  var shape_renderers = {
    ellipse: function() { return render_vector_ellipse(xr, yr, offset); },
    pentagon: function() { return render_vector_ngon(5, xr, yr, offset); },
    hexagon: function()  { return render_vector_ngon(6, xr, yr, offset); },
    octagon: function()  { return render_vector_ngon(8, xr, yr, offset); },
    diamond: function()   { return render_vector_ngon(4, xr, yr, offset); },
    square: function()   { return "" },
    triangle: function() { return render_vector_ngon(3, xr, yr, offset); },
    star: function() { return render_vector_star(5, a.w, a.h, a.stroke); },
    burst: function() { return render_vector_star(10, a.w, a.h, a.stroke); },
    speechbubble: function() { return render_vector_speechbubble(xr, yr, offset); },
    heart: function() { return render_vector_heart(xr, yr, offset); },
    cloud: function() { return render_vector_cloud(xr, yr, offset); },
  }

  var render_func = shape_renderers[a.shape];

  if (!render_func) return "";

  return render_func();
}