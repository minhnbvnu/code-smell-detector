function $pset(x, y, color, clipX1, clipY1, clipX2, clipY2) {
    // quadplay pixels have integer centers, so we must round instead of just truncating.
    // Otherwise, for example, -0.7, which is offscreen, would become 0 and be visible.
    //
    // "i >>> 0" converts from signed to unsigned int, which forces negative values to be large
    // and lets us early-out sooner in the tests.
    const i = $Math.round(x) >>> 0;
    const j = $Math.round(y) >>> 0;

    if ((i <= clipX2) && (j <= clipY2) && (i >= clipX1) && (j >= clipY1)) {
        const offset = i + j * $SCREEN_WIDTH;

        // Must be unsigned shift to avoid sign extension
        const a15 = color >>> 12;

        if (a15 === 0xf) {
            // No blending
            $screen[offset] = color;
        } else if (a15 !== 0) {
            // Blend

            // No need to force to unsigned int because the alpha channel of the output is always 0xff
            const a = a15 * (1 / 15);
            let back = $screen[offset] >>> 0;
            let result = 0xF000;
            result |= ((back & 0x0F00) * (1 - a) + (color & 0x0F00) * a + 0.5 * 0x100) & 0x0F00;
            result |= ((back & 0x00F0) * (1 - a) + (color & 0x00F0) * a + 0.5 * 0x010) & 0x00F0;
            result |= ((back & 0x000F) * (1 - a) + (color & 0x000F) * a + 0.5) & 0x000F;
            $screen[offset] = result;
        }
    }
}