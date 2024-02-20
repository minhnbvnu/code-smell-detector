function drawBubble(x,y,size) {
  context.beginPath();
  context.arc(x,y,size,0,2*Math.PI);
  context.fillStyle = '#fff';
  context.globalAlpha = .75;
  context.fill();
  context.strokeStyle = '#000';
  context.globalAlpha = .25;
  context.stroke();
}