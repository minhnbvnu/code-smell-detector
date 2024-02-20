function movbulb(){
with (this) {
if(ec < 20){
if(Math.abs(x0 - xm) < 100 && Math.abs(y0 - ym) < 100){
xx = (xm - x0) / 8;
yy = (ym - y0) / 8;
ec++;
}
}
xx *= 0.99;
yy *= 0.99;
x0 = Math.round(x0 + Math.cos(y0 / 15) * p) + xx;
y0+= yy - v;
if(y0 < -h * 2 || x0 < -w * 2 || x0 > nx + w * 2){
y0 = ny + N + h * 2;
x0 = nx/2-100 + Math.random() * 100;
ec = 0;
}
obj.style.top  = y0 - h;
obj.style.left = x0 - w;
}
}