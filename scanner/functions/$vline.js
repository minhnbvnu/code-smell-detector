function $vline(x, y1, y2, color, clipX1, clipY1, clipX2, clipY2) {
    x  = $Math.round(x) | 0;
    y1 = $Math.round(y1) | 0;
    y2 = $Math.round(y2) | 0;
    
    if ((y2 >= clipY1) && (y1 <= clipY2) && (x >= clipX1) && (x <= clipX2)) {
        y1 = $Math.max(clipY1, y1);
        y2 = $Math.min(clipY2, y2);

        let a15 = color >>> 12;
        if (a15 === 0xf) {
            for (let y = y1, offset = y1 * $SCREEN_WIDTH + x; y <= y2; ++y, offset += $SCREEN_WIDTH) {
                $screen[offset] = color;
            }
        } else if (a15 !== 0) {
            // Blend (see comments in $pset)
            const a = a15 * (1 / 15);
            const inva = 1 - a;
            const b = (color & 0x0F00) * a + 0.5 * 0x100;
            const g = (color & 0x00F0) * a + 0.5 * 0x010;
            const r = (color & 0x000F) * a + 0.5;
            for (let y = y1, offset = y1 * $SCREEN_WIDTH + x; y <= y2; ++y, offset += $SCREEN_WIDTH) {
                let back = $screen[offset] >>> 0;
                let result = 0xF000;
                result |= ((back & 0x0F00) * inva + b) & 0x0F00;
                result |= ((back & 0x00F0) * inva + g) & 0x00F0;
                result |= ((back & 0x000F) * inva + r) & 0x000F;
                $screen[offset] = result;
            }
        }
    }
}