function drawTile(x,y,angle) {
  context.save();
  context.translate(x+.5*tileSize,y+.5*tileSize);
  context.rotate(angle);

  context.fillStyle = '#fff';
  context.fillRect(-.5*tileSize,-.5*tileSize,tileSize,tileSize);

  context.lineWidth = .5;
  context.strokeStyle = '#888';
  context.beginPath();
  context.rect(-.5*tileSize,-.5*tileSize,tileSize,tileSize);
  //context.arc(0,0,.5*tileSize,0,2*Math.PI);
  context.stroke();

  context.lineWidth = 8;
  context.strokeStyle = '#222';
  context.beginPath();
  context.arc(-.5*tileSize,-.5*tileSize,.5*tileSize,0,Math.PI/2);
  context.stroke();

  context.beginPath();
  context.arc(.5*tileSize,.5*tileSize,.5*tileSize,-Math.PI,-Math.PI/2);
  context.stroke();

  context.restore();
}