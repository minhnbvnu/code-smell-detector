function CObj(N,img,w,h){
this.obj = document.createElement("img");
this.obj.src = img.src;
this.obj.style.position = "fixed";
this.obj.style.left = -1000;
document.body.appendChild(this.obj);
this.N  = N;
this.x0 = 0;
this.y0 = -1000;
this.v  = 1 + Math.round((80 / h) * Math.random());
this.p  = 1 + Math.round((w / 8) * Math.random());
this.xx = 0;
this.yy = 0;
this.ec = 0;
this.w  = w;
this.h  = h;
this.movbulb = movbulb;
}