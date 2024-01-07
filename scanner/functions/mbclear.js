function mbclear( context, x, y, w, h ){
    var gco = context.globalCompositeOperation;

    context.globalCompositeOperation = 'destination-out';
    r.colorFillStyle( context, 255, 255, 255, r.motionBlurTransparency );
    context.fillRect( x, y, w, h );

    context.globalCompositeOperation = gco;
  }