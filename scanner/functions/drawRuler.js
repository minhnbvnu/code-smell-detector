function drawRuler() {
  var ruler = $('#ruler');
  var rulerContext = ruler[0].getContext("2d");

  //rulerContext.fillStyle = noteSoftColor;
  //rulerContext.fillRect(0, 0, ruler.width(), ruler.height());
  for (i = 0; i <= patternLength; i++) {
    rulerContext.strokeStyle = "#fff";
    rulerContext.stroke();
    // draw half notes:
    if (i % 8 == 0) {
      rulerContext.moveTo(i * noteWidth, 0);
      rulerContext.lineTo(i * noteWidth, ruler.height());
    }
    else if (i % 4 == 0) {
      rulerContext.moveTo(i * noteWidth, 0);
      rulerContext.lineTo(i * noteWidth, ruler.height() * 0.5);
    }
    else if (i % 2 == 0) {
      rulerContext.moveTo(i * noteWidth, 0);
      rulerContext.lineTo(i * noteWidth, ruler.height() * 0.35);
    }
    else {
      rulerContext.moveTo(i * noteWidth, 0);
      rulerContext.lineTo(i * noteWidth, ruler.height() * 0.15);
    }
  }
  // rulerContext.strokeRect(0, 0, ruler.width(), ruler.height());
}