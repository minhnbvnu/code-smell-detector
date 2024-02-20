function $executeCIR(cmd) {
    let outline = cmd.outline, color = cmd.color;
    //    let  x = cmd.x - 0.5, y = cmd.y - 0.5, radius = cmd.radius + 0.5;
    let  x = cmd.x, y = cmd.y, radius = cmd.radius;

    const clipX1 = cmd.clipX1, clipY1 = cmd.clipY1,
          clipX2 = cmd.clipX2, clipY2 = cmd.clipY2;

    // The enclosing box, following the draw_corner_rect() logic, will be
    // Lines from $Math.floor(x - radius + 0.5) to $Math.floor(x + radius - 0.5).
    // Because of the rounding rules in $hline, this is equivalent to:
    //
    //   $hline($Math.floor(x - radius + 0.5), y, $Math.floor(x + radius - 0.5), outline, clipX1, clipY1, clipX2, clipY2)
    // or
    //   $hline(x - radius, y, x + radius - 1, outline, clipX1, clipY1, clipX2, clipY2)

    // Snap to the enclosing box
    const oldX = x, oldY = y;
    x = ($Math.round(oldX - radius) + $Math.round(oldX + radius - 1)) * 0.5
    y = ($Math.round(oldY - radius) + $Math.round(oldY + radius - 1)) * 0.5
    radius = $Math.max(($Math.round(oldX + radius - 1) - $Math.round(oldX - radius)) * 0.5,
                       ($Math.round(oldY + radius - 1) - $Math.round(oldY - radius)) * 0.5);

    // Special case small circles
    if (radius < 0.5) {
        // 1x1
        $pset(x, y, (outline & 0xf000) ? outline : color, clipX1, clipY1, clipX2, clipY2);
        return;
    } else if (radius <= 0.75) {
        // 2x2
        const fillColor = (outline & 0xf000) ? outline : color;
        $hline(x - 0.5, y - 0.5, x + 0.5, fillColor, clipX1, clipY1, clipX2, clipY2);
        $hline(x - 0.5, y + 0.5, x + 0.5, fillColor, clipX1, clipY1, clipX2, clipY2);
        return;
    } else if (radius <= 1.25) {
        // 3x3
        if (outline & 0xf000) {
            $pset(x, y - 1, outline, clipX1, clipY1, clipX2, clipY2);
            $pset(x - 1, y, outline, clipX1, clipY1, clipX2, clipY2);
            $pset(x + 1, y, outline, clipX1, clipY1, clipX2, clipY2);
            $pset(x, y + 1, outline, clipX1, clipY1, clipX2, clipY2);
            $pset(x, y, color, clipX1, clipY1, clipX2, clipY2);
        } else {
            $pset(x, y - 1, color, clipX1, clipY1, clipX2, clipY2);
            $hline(x - 1, y, x + 1, color, clipX1, clipY1, clipX2, clipY2);
            $pset(x, y + 1, color, clipX1, clipY1, clipX2, clipY2);
        }
        return;
    } else if (radius <= 1.75) {
        if (outline & 0xf000) {
            //   **
            //  *  *
            //  *  *
            //   **
            $hline(x - 0.5, y - 1.5, x + 0.5, outline, clipX1, clipY1, clipX2, clipY2);
            $pset(x - 1.5, y - 0.5, outline, clipX1, clipY1, clipX2, clipY2);
            $pset(x + 1.5, y - 0.5, outline, clipX1, clipY1, clipX2, clipY2);
            $pset(x - 1.5, y + 0.5, outline, clipX1, clipY1, clipX2, clipY2);
            $pset(x + 1.5, y + 0.5, outline, clipX1, clipY1, clipX2, clipY2);
            $hline(x - 0.5, y - 0.5, x + 0.5, color, clipX1, clipY1, clipX2, clipY2);
            $hline(x - 0.5, y + 0.5, x + 0.5, color, clipX1, clipY1, clipX2, clipY2);
            $hline(x - 0.5, y + 1.5, x + 0.5, outline, clipX1, clipY1, clipX2, clipY2);
        } else {
            $hline(x - 0.5, y - 1.5, x + 0.5, color, clipX1, clipY1, clipX2, clipY2);
            $hline(x - 1.5, y - 0.5, x + 1.5, color, clipX1, clipY1, clipX2, clipY2);
            $hline(x - 1.5, y + 0.5, x + 1.5, color, clipX1, clipY1, clipX2, clipY2);
            $hline(x - 0.5, y + 1.5, x + 0.5, color, clipX1, clipY1, clipX2, clipY2);
        }
        // 4x4
        return;
    } else if (radius <= 2.5) {
        radius -= 0.4;
    } else if (radius <= 3.5) {
        // Increase rounding of 6x6
        radius -= 0.25;
    }

    const j_unclipped_first = $Math.round(y - radius) | 0;
    const j_min = $Math.max(j_unclipped_first, clipY1 | 0) | 0;

    // The small epsilon keeps the y value from slightly overhanging by one pixel
    // due to roundoff when jittering
    const j_unclipped_last = $Math.round(y + radius - 0.00001) | 0; 
    const j_max = $Math.min(j_unclipped_last, clipY2 | 0) | 0;

    // Intersect this scanline
    //
    // Line Y = j+0.5 intersects Circle (X - x)² + (Y - y)² = r²
    // Substitute:
    //    (x - X)² = r² - (j + 0.5 - y)²
    //    x = -X ± sqrt(r² - (j + 0.5 - y)²)
    //
    // The -0.49999 keeps the top and bottom row consistent with the
    // rest of the circle
    let next_spread = $Math.sqrt($Math.max(radius * radius - $square(Math.abs(j_min - y) - 0.49999), 0.5));
    let next_lo = $Math.round(x - next_spread) >>> 0;
    let next_hi = $Math.round(x + next_spread) >>> 0;
    let prev_lo = 0, prev_hi = 0;
    for (let j = j_min; j <= j_max; ++j) {
        // Inclusive x bounds
        const spread = next_spread;
        let lo = next_lo;
        let hi = next_hi;

        // We need to look one line ahead to connect the bottom half outlines
        next_spread = $Math.sqrt($Math.max(radius * radius - $square(Math.abs(j - y + 1) - 0.49999), 0.5));
        next_lo = $Math.round(x - next_spread) >>> 0;
        next_hi = $Math.round(x + next_spread) >>> 0;

        // Draw the outline first, moving lo and hi as needed to prevent overdraw
        if ((outline & 0xf000) && (outline !== color)) {
            if (j === j_unclipped_first || j === j_unclipped_last) {
                // Connect the first and last rows completely

                // Top
                $hline(lo, j, hi, outline, clipX1, clipY1, clipX2, clipY2);
                
                prev_lo = lo; prev_hi = hi;
                
                // There is no fill in this case because the outline dominates the row
                continue;
            } else if (lo < prev_lo - 1) {
                // On the top half of the circle and need a 2+ pixel horizontal outline.
                // The circle is symmetric, so we only need to check one horizontal side
                // to know that we're in this case.
                $hline(lo, j, prev_lo - 1, outline, clipX1, clipY1, clipX2, clipY2);
                $hline(prev_hi + 1, j, hi, outline, clipX1, clipY1, clipX2, clipY2);
                // Bring in the fill bounds so that they do not overdraw the outline
                // by swapping values.
                {const temp = prev_lo; prev_lo = lo, lo = temp;}
                {const temp = prev_hi; prev_hi = hi, hi = temp;}
            } else if (next_lo > lo + 1) {
                // On the bottom half of the circle and need a 2+ horizontal pixel outline.
                $hline(lo, j, next_lo - 1, outline, clipX1, clipY1, clipX2, clipY2);
                $hline(next_hi + 1, j, hi, outline, clipX1, clipY1, clipX2, clipY2);
                
                prev_lo = next_lo; prev_hi = next_hi;
                // Bring in the fill bounds so that they do not overdraw the outline
                lo = next_lo; hi = next_hi;
            } else {
                $pset(lo, j, outline, clipX1, clipY1, clipX2, clipY2);
                $pset(hi, j, outline, clipX1, clipY1, clipX2, clipY2);
                prev_lo = lo; prev_hi = hi;
                // Bring in the fill bounds so that they do not overdraw the outline
                ++lo; --hi;
            }
        }

        // Fill
        if (color & 0xf000) {
            $hline(lo, j, hi, color, clipX1, clipY1, clipX2, clipY2);
        }

    }
    return;

    /*
    ///////////////////////////////////////////////////////////////////
    // Old midpoint code. That classic algorithm only works when the bounding
    // box is odd. I.e., it always creates a diameter of 2 * floor(r) + 1,
    // so cannot inscribe bounds exactly for arbitrary circles within rectangles.

    if (color & 0xf000) {
        // offset
        let ox = radius - 1, oy = 0;
        
        // step
        let dx = 1, dy = 1;
        let err = dx - radius * 2;

        // Midpoint circle algorithm. Iterate over 1/8 of the circle,
        // reflect to all sides
        while (ox >= oy) {
            // Center
            if (ox !== oy) {
                // Bottom
                $hline(x - ox, y + oy, x + ox, color, clipX1, clipY1, clipX2, clipY2);
                
                // Top
                if (oy > 0) { $hline(x - ox, y - oy, x + ox, color, clipX1, clipY1, clipX2, clipY2); }
            }
                
            let old = oy;
            // -4 gives better shape for small circles
            if (err <= -4) {
                ++oy;
                err += dy;
                dy += 2;
            }

            // ...intentionally no "else" to allow diagonal changes in both x and y position...
            
            if (err > -4) {
                // Caps
                $hline(x - old, y + ox, x + old, color, clipX1, clipY1, clipX2, clipY2);
                $hline(x - old, y - ox, x + old, color, clipX1, clipY1, clipX2, clipY2);
                --ox;
                dx += 2;
                err += dx - radius * 2;
            }
        } // while
    } // if color

    
    if ((outline & 0xf000) && (outline !== color)) {
        // offset
        let ox = radius - 1, oy = 0;

        // step
        let dx = 1, dy = 1;
        let err = dx - radius * 2;

        while (ox >= oy) {
            if (ox !== oy) {
                // Bottom center
                $pset(x - ox, y + oy, outline, clipX1, clipY1, clipX2, clipY2);
                $pset(x + ox, y + oy, outline, clipX1, clipY1, clipX2, clipY2);

                if (oy > 0) {
                    // Top center
                    $pset(x - ox, y - oy, outline, clipX1, clipY1, clipX2, clipY2);
                    $pset(x + ox, y - oy, outline, clipX1, clipY1, clipX2, clipY2);
                }
            }

            // Bottom cap
            $pset(x - oy, y + ox, outline, clipX1, clipY1, clipX2, clipY2);

            // Top cap
            $pset(x - oy, y - ox, outline, clipX1, clipY1, clipX2, clipY2);
            
            if (oy > 0) {
                // Bottom cap
                $pset(x + oy, y + ox, outline, clipX1, clipY1, clipX2, clipY2);
                
                // Top cap
                $pset(x + oy, y - ox, outline, clipX1, clipY1, clipX2, clipY2);
            }

            if (err <= -4) {
                ++oy;
                err += dy;
                dy += 2;
            }

            if (err > -4) {
                --ox;
                dx += 2;
                err -= radius * 2 - dx;
            }
        } // while
    } // if outline
    */
}