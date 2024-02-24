function segmentToBezier(cx,cy,th0,th1,rx,ry,sin_th,cos_th){argsStr=join.call(arguments);if(segmentToBezierCache[argsStr]){return segmentToBezierCache[argsStr]}var a00=cos_th*rx;var a01=-sin_th*ry;var a10=sin_th*rx;var a11=cos_th*ry;var cos_th0=Math.cos(th0);var sin_th0=Math.sin(th0);var cos_th1=Math.cos(th1);var sin_th1=Math.sin(th1);var th_half=.5*(th1-th0);var sin_th_h2=Math.sin(th_half*.5);var t=8/3*sin_th_h2*sin_th_h2/Math.sin(th_half);var x1=cx+cos_th0-t*sin_th0;var y1=cy+sin_th0+t*cos_th0;var x3=cx+cos_th1;var y3=cy+sin_th1;var x2=x3+t*sin_th1;var y2=y3-t*cos_th1;return segmentToBezierCache[argsStr]=[a00*x1+a01*y1,a10*x1+a11*y1,a00*x2+a01*y2,a10*x2+a11*y2,a00*x3+a01*y3,a10*x3+a11*y3]}