function finishDrawingRectangle() {
   if (rubberbandW > 0 && rubberbandH > 0) {
      if (doFill) {
        drawingContext.fillRect(rubberbandUlhc.x,
                                rubberbandUlhc.y,
                                rubberbandW, rubberbandH) 
      }
      drawingContext.strokeRect(rubberbandUlhc.x,
                                rubberbandUlhc.y,
                                rubberbandW, rubberbandH); 
   }
}