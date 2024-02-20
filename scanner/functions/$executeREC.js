function $executeREC(cmd) {
    const clipX1 = cmd.clipX1, clipY1 = cmd.clipY1,
          clipX2 = cmd.clipX2, clipY2 = cmd.clipY2;

    const data = cmd.data;

    for (let i = 0; i < data.length; ++i) {
        const rect = data[i];
        const outline = rect.outline, fill = rect.fill;
        let x1 = rect.x1, x2 = rect.x2, y1 = rect.y1, y2 = rect.y2;

        if ((outline !== fill) && (outline > 0xFFF)) {
            $hline(x1, y1, x2, outline, clipX1, clipY1, clipX2, clipY2);
            $hline(x1, y2, x2, outline, clipX1, clipY1, clipX2, clipY2);
            $vline(x1, y1 + 1, y2 - 1, outline, clipX1, clipY1, clipX2, clipY2);
            $vline(x2, y1 + 1, y2 - 1, outline, clipX1, clipY1, clipX2, clipY2);
            x1 += 1; y1 += 1; x2 -= 1; y2 -= 1;
        }
        
        if (fill & 0xf000) {
            
            // Snap to integer and set_clip to screen. We don't need to
            // round because we know that the rect is visible.
            x1 = $Math.max((x1 + 0.5) | 0, clipX1);
            x2 = $Math.min((x2 + 0.5) | 0, clipX2);
            y1 = $Math.max((y1 + 0.5) | 0, clipY1);
            y2 = $Math.min((y2 + 0.5) | 0, clipY2);

            // Blend spans
            for (let y = y1, i = y1 * $SCREEN_WIDTH; y <= y2; ++y, i += $SCREEN_WIDTH) {
                $hline(x1, y, x2, fill, clipX1, clipY1, clipX2, clipY2);
            }
        }
    }
}