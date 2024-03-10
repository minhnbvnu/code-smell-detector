function $line(x1, y1, x2, y2, color, clipX1, clipY1, clipX2, clipY2, open1, open2) {
    if (y1 === y2) {
        // Horizontal perf optimization/avoid divide by zero
        const dx = $Math.sign(x2 - x1)
        if (open1) { x1 += dx; }
        if (open2) { x2 -= dx; }
        $hline($Math.min(x1, x2), y1, $Math.max(x1, x2), color, clipX1, clipY1, clipX2, clipY2);
    } else if (x1 === x2) {
        // Vertical perf optimization
        const dy = $Math.sign(y2 - y1)
        if (open1) { y1 += dy; }
        if (open2) { y2 -= dy; }
        $vline(x1, $Math.min(y1, y2), $Math.max(y1, y2), color, clipX1, clipY1, clipX2, clipY2);
    } else {
        // General case via DDA

        // Slope:
        const dx = x2 - x1, dy = y2 - y1;
        const moreHorizontal = Math.abs(dx) > Math.abs(dy);

        if ((moreHorizontal && (x2 < x1)) ||
            (! moreHorizontal && (y2 < y1))) {
            // Swap endpoints to go in increasing direction on the dominant axis.
            // Slope is unchanged because both deltas become negated.
            let temp;
            temp = y1; y1 = y2; y2 = temp;
            temp = x1; x1 = x2; x2 = temp;
            temp = open1; open1 = open2; open2 = temp;
        }

        if (moreHorizontal) {
            // Crop horizontally:
            const m = dy / dx;

            if (open1) { ++x1; y1 += m; }            
            if (open2) { --x2; /* y2 is unused */ } 

            // Adjust for x1 being clipped
            const step = $Math.max(clipX1, x1) - x1;
            x1 += step; y1 += m * step;

            // Adjust for x2 being clipped (y2 is unused, so ignore it)
            x2 = $Math.min(x2, clipX2);

            x1 |= 0; x2 |= 0;

            if ((color & 0xf000) === 0xf000) {
                // No blending
                for (let x = x1, y = y1; x <= x2; ++x, y += m) {
                    const j = $Math.round(y) >>> 0;
                    if ((j <= clipY2) && (j >= clipY1)) {
                        $screen[x + j * $SCREEN_WIDTH | 0] = color;
                    }
                }
            } else {
                for (let x = x1, y = y1; x <= x2; ++x, y += m) {
                    $pset(x, y, color, clipX1, clipY1, clipX2, clipY2);
                } // for x
            }
        } else { // Vertical
            // Compute the inverted slope
            const m = dx / dy;

            if (open1) { ++y1; x1 += m; } 
            if (open2) { --y2; x2 -= m; } 
            
            // Crop vertically:
            const step = $Math.max(clipY1, y1) - y1;
            x1 += step * m; y1 += step;
            y2 = $Math.min(y2, clipY2);
            y1 |= 0; y2 |= 0;

            if ((color & 0xf000) === 0xf000) {
                // No blending
                for (let y = y1, base = (y1 * $SCREEN_WIDTH) | 0, x = x1; y <= y2; ++y, base += $SCREEN_WIDTH | 0, x += m) {
                    const i = $Math.round(x) >>> 0;
                    if ((i <= clipX2) && (i >= clipX1)) {
                        $screen[base + i] = color;
                    }
                } // for y
            } else {
                for (let y = y1, x = x1; y <= y2; ++y, x += m) {
                    $pset(x, y, color, clipX1, clipY1, clipX2, clipY2);
                } // for y
            }
            
        } // if more horizontal
    } // if diagonal
}