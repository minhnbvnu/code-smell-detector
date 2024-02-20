function hline(text, yunits) {
        ypx = glyphBaseline - yunits * glyphScale;
        ctx.fillStyle = '#788b94';
        ctx.font = 'bold 12px "Open Sans"';
        ctx.fillText(text.toUpperCase(), 2, ypx + 3);
        ctx.fillStyle = 'rgba(255,255,255,0.12)';
        ctx.fillRect(90, ypx, w, 1);
    }