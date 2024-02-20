function linearEffect(width, height, bg, ctx) {
    const param = analizeLinear(bg, width, height);
    const grd = ctx.createLinearGradient(param[0], param[1], param[2], param[3]);
    const content = bg.match(/linear-gradient\((.+)\)/)[1];
    const colorPer = analizeGrad(content.substring(content.indexOf(',') + 1));
    for (let i = 0; i < colorPer.colors.length; i++) {
      grd.addColorStop(colorPer.percents[i], colorPer.colors[i]);
    }
    ctx.fillStyle = grd
    //ctx.fillRect(-(width / 2), -(height / 2), width, height);
  }