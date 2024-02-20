function DrawLine(From, To) {
  var x1 = From.V[0];
  var x2 = To.V[0];
  var y1 = From.V[1];
  var y2 = To.V[1];
  var dx = Math.abs(x2 - x1);
  var dy = Math.abs(y2 - y1);
  var x = x1;
  var y = y1;
  var IncX1, IncY1;
  var IncX2, IncY2;  
  var Den;
  var Num;
  var NumAdd;
  var NumPix;

  if (x2 >= x1) {  IncX1 = 1; IncX2 = 1;  }
  else { IncX1 = -1; IncX2 = -1; }
  if (y2 >= y1)  {  IncY1 = 1; IncY2 = 1; }
  else { IncY1 = -1; IncY2 = -1; }
  if (dx >= dy) {
    IncX1 = 0;
    IncY2 = 0;
    Den = dx;
    Num = dx / 2;
    NumAdd = dy;
    NumPix = dx;
  }
  else {
    IncX2 = 0;
    IncY1 = 0;
    Den = dy;
    Num = dy / 2;
    NumAdd = dx;
    NumPix = dy;
  }

  NumPix = Math.round(Q.LastPx + NumPix);

  var i = Q.LastPx;
  for (; i < NumPix; i++) {
    Num += NumAdd;
    if (Num >= Den) {
      Num -= Den;
      x += IncX1;
      y += IncY1;
    }
    x += IncX2;
    y += IncY2;
  }
  Q.LastPx = NumPix;
}