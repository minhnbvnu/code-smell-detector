function render_vector_speechbubble(xr, yr, offset) {
  var cmds = ['M',[100,50],
  'c',[0,9.5,-2.7,18,-7.4,26],
  'C',[90,80,100,100,100,100],
  's',[-23.194,-6.417,-28,-4.162],
  'c',[-6.375,3,-13.5,4.7,-21,4.7],
  'C',[23,100,0.5,77,0.5,50],
  'C',[0.5,23,23,0.5,50,0.5],
  'C',[77,0.5,100,23,100,50],
  'z',[]]; 

  svg ="<path d='"+ transform_vector_template(cmds, xr, yr, offset) +"'/>";

  return svg;
}