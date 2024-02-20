function generate_geometry(surface, time) {
  normals = [];
  vertices = [];
  var x_discretized_interval = new Array(surface.x_divisions);
  var y_discretized_interval = new Array(surface.y_divisions);
  var dx = (surface.x_final-surface.x_initial) / (surface.x_divisions-1);
  var dy = (surface.y_final-surface.y_initial) / (surface.y_divisions-1);

  // Discretize intervals
  for (let i = 0; i < surface.x_divisions; i++) {
    x_discretized_interval[i] = dx * i + surface.x_initial;
  }
  for (let i = 0; i < surface.y_divisions; i++) {
    y_discretized_interval[i] = dy * i + surface.y_initial;
  }

  // Calculate vertices
  for (const x of x_discretized_interval) {
    for (const y of y_discretized_interval) {
      var pos = vec3(x, y, 1.0);
      var pos2 = vec3(pos);
      var morph = -Math.abs(1.6 * (time % 7.5) - 6) + 5;
      vertices.push(mix(pos, normalize(pos2), morph)); 
    }
  }

  // Calculate Normals
  for (let i = 0; i < surface.x_divisions; i++) {
    for (let j = 0; j <  surface.y_divisions; j++) {
      // Useful vectors
      var v = vertices[i*surface.y_divisions + j];
      var viprev = vertices[i*surface.y_divisions + j - 1];
      var vinext = vertices[i*surface.y_divisions + j + 1];
      var vjprev = vertices[(i-1)*surface.y_divisions + j];
      var vjnext = vertices[(i+1)*surface.y_divisions + j];

      // Find Partials
      if (j % surface.x_divisions === 0) {
        partial_x = subtract(vinext, v);
      } else if ((j+1) % surface.x_divisions === 0) {
        partial_x = subtract(v, viprev);
      } else {
        partial_x = add(subtract(vinext, v), subtract(v, viprev));
      }
      if (i % surface.y_divisions === 0) {
        partial_y = subtract(vjnext, v);
      } else if ((i+1) % surface.y_divisions === 0) {
        partial_y = subtract(v, vjprev);
      } else {
        partial_y = add(subtract(vjnext, v), subtract(v, vjprev));
      }

      // Cross Partials for Normal
      normals.push(vec4(normalize(cross(partial_y, partial_x)), 0.0));
    }
  }
}