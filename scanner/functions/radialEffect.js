function radialEffect(width, height, bg, ctx) {
    const colorPer = analizeGrad(bg.match(/radial-gradient\((.+)\)/)[1]);
    const grd = ctx.createCircularGradient(0, 0, width < height ? height / 2 : width / 2);
    for (let i = 0; i < colorPer.colors.length; i++) {
      grd.addColorStop(colorPer.percents[i], colorPer.colors[i]);
    }
    ctx.fillStyle = grd;
    //ctx.fillRect(-(width / 2), -(height / 2), width, height);
  }