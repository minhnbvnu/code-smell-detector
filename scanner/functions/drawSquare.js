function drawSquare(size, range) {

  let sign = 1;
  if (range>1) {
    range = 1 - (range-1);
    sign = -1;
  }

  context.beginPath();
  const r = .7*size;
  for (let a=0; a<=(range)*2*Math.PI; a+=2*Math.PI/180) {
    const x = Maf.clamp( r * Math.cos(sign*(a+(range)*2*Math.PI)),-.5*size, .5*size);
    const y = Maf.clamp( r * Math.sin(sign*(a+(range)*2*Math.PI)),-.5*size, .5*size);
    if (a===0) context.moveTo(x,y);
    else context.lineTo(x,y);
  }
 // context.globalAlpha = .2 + range;
  context.stroke();
}