function render_grid(w,h,divisions) {
  temp_grid_canvas.width = w;
  temp_grid_canvas.height = h;

  var step = w / divisions;

  var ctx = temp_grid_canvas.getContext('2d');
  ctx.strokeStyle = "#f0f0f0";
  ctx.lineWidth = 1;

  var gc1 = "rgba(60,60,60,0.125)";
  var gc2 = "rgba(60,60,60,0.075)";

  for (var y=0; y<h; y+=step) {
    if (y==0) {
      ctx.fillStyle = gc1;
    } else {
      ctx.fillStyle = gc2;
    }
    ctx.fillRect(0,y,w,1);
  }
  for (var x=0; x<h; x+=step) {
    if (x==0) {
      ctx.fillStyle = gc1;
    } else {
      ctx.fillStyle = gc2;
    }
    ctx.fillRect(x,0,1,h);
  }

  var data_url = temp_grid_canvas.toDataURL()
  return data_url;
}