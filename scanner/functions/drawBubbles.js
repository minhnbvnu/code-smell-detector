function drawBubbles(bubbles, size, time) {
  bubbles.forEach( b => {
    const x = b.x * .5*canvas.width;
    const y = b.y * .5*canvas.height;
    drawBubble(x,y+b.speed*time*canvas.height,1+size*b.size);
    drawBubble(x,y-b.speed*canvas.height+b.speed*time*canvas.height,1+size*b.size);
    drawBubble(x,y-2*b.speed*canvas.height+b.speed*time*canvas.height,1+size*b.size);
    drawBubble(x,y-3*b.speed*canvas.height+b.speed*time*canvas.height,1+size*b.size);
  })
}