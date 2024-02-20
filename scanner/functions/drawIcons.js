function drawIcons() {
   iconContext.clearRect(0,0, iconCanvas.width,
                              iconCanvas.height);
   
   ICON_RECTANGLES.forEach(function(rect) {
      iconContext.save();

      if (selectedRect === rect) setSelectedIconShadow();
      else                       setIconShadow();

      iconContext.fillStyle = ICON_BACKGROUND_STYLE;
      iconContext.fillRect(rect.x, rect.y, rect.w, rect.h);

      iconContext.restore();

      drawIcon(rect);
   });
}