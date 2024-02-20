function drawShadowInternal(w, h, radius, center, translate) {
    var centerPosX = Math.round((canvas.width / 2) - (w / 2));
    var centerPosY = Math.round((canvas.height / 2) - (h / 2));
    var x = 0, y = 0;
    var offsetForTransparent = -9999;

    ctx.save();
    if (isTransparentFill) ctx.translate(offsetForTransparent, offsetForTransparent);

    if (center) {
        x = centerPosX;
        y = centerPosY;
    } else if (translate) {
        x = getRelativeX();
        y = getRelativeY();
    }
    if (boxResizeMode != BOX_RESIZE_TYPE.None) {
        x -= shadowOffsetX;
        y -= shadowOffsetY;
    }
    ctx.roundRect(x, y, w, h, radius);

    if (!isTransparentFill) {
        setShadow(shadowOffsetX, shadowOffsetY, shadowBlur, shadowColor);
    } else {
        setShadow(shadowOffsetX - offsetForTransparent, shadowOffsetY - offsetForTransparent, shadowBlur, shadowColor);
    }

    ctx.fill();

    if (!isTransparentFill && outlineWidth > 0) {
        setShadow(0,0,0,0);
        ctx.strokeStyle = outlineColor;
        ctx.lineWidth = outlineWidth;
        ctx.stroke();
    }

    ctx.restore();

    ctx.save();

    ctx.globalCompositeOperation = 'destination-out';
    if (center) {
        x = centerPosX;
        y = centerPosY;
    } else if (translate) {
        x = getRelativeX();
        y = getRelativeY();
    }
    if (boxResizeMode != BOX_RESIZE_TYPE.None) {
        x -= shadowOffsetX;
        y -= shadowOffsetY;
    }
    ctx.roundRect(x, y, w, h, radius);
    ctx.fill();
    ctx.restore();

    if (!isTransparentFill)
    {
        ctx.save();
        ctx.fillStyle = fillColor;
        ctx.roundRect(x, y, w, h, radius);
        ctx.fill();
        ctx.restore();
    }
}