function $hline(x1, y, x2, color, clipX1, clipY1, clipX2, clipY2) {
    x1 = $Math.round(x1) | 0;
    x2 = $Math.round(x2) | 0;
    y  = $Math.round(y)  | 0;

    if ((x2 >= clipX1) && (x1 <= clipX2) && (y >= clipY1) && (y <= clipY2)) {
        // Some part is on screen

        // Don't draw past the edge of the screen
        x1 = $Math.max(x1, clipX1) | 0;
        x2 = $Math.min(x2, clipX2) | 0;
        
        let a15 = (color >>> 12) & 0xf;
        if (a15 === 0xf) {
            // Overwrite
            $screen.fill(color, x1 + (y * $SCREEN_WIDTH), x2 + (y * $SCREEN_WIDTH) + 1);
        } else if (a15 !== 0) {
            // Blend (see comments in $pset)
            const a = a15 * (1 / 15);
            const inva = 1 - a;
            const b = (color & 0xF00) * a + 0.5 * 0x100;
            const g = (color & 0x0F0) * a + 0.5 * 0x010;
            const r = (color & 0x00F) * a + 0.5;

            for (let x = x1, offset = (x1 + y * $SCREEN_WIDTH) | 0; x <= x2; ++x, ++offset) {
                let back = $screen[offset] >>> 0;
                let result = 0xF000 >>> 0;
                result |= ((back & 0x0F00) * inva + b) & 0x0F00;
                result |= ((back & 0x00F0) * inva + g) & 0x00F0;
                result |= ((back & 0x000F) * inva + r) & 0x000F;
                $screen[offset] = result;
            }
        }
    }
}