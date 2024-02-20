function render_vector_ngon(edges,xradius,yradius,offset) {
  var points = [];
  var degrees = 360 / edges;
  for (var i=0; i < edges; i++) {
    var a = i * degrees - 90;

    var x = offset + xradius + xradius * Math.cos(a * Math.PI / 180);
    var y = offset + yradius + yradius * Math.sin(a * Math.PI / 180);
    points.push(x+","+y);
  }
  
  return "<polygon points='"+points.join(" ")+"'/>";
}