function finishDrawingCircle(loc) {
   var angle = Math.atan(rubberbandH/rubberbandW),
       radius = rubberbandH / Math.sin(angle);
   
   if (mousedown.y === loc.y) {
      radius = Math.abs(loc.x - mousedown.x); 
   }

   drawingContext.beginPath();
   drawingContext.arc(mousedown.x, mousedown.y,
                      radius, 0, Math.PI*2, false); 

   if (doFill) {
      drawingContext.fill();
   }

   drawingContext.stroke();
}