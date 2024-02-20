function generate_indices(surface) {
  indices = [];
  for (var i = 0; i < surface.x_divisions-1; i++) {
    for (var j = 0; j < surface.y_divisions-1; j++) {
      // A square is made from an upper and lower triangle
      a = i*surface.x_divisions + j;
      b = i*surface.x_divisions + j + 1;
      c = (i+1)*surface.x_divisions + j + 1;
      d = (i+1)*surface.x_divisions + j;

      // first triangle
      indices.push(a);
      indices.push(b);
      indices.push(c);

      // second triangle
      indices.push(a);
      indices.push(c);
      indices.push(d);
    }
  }
}