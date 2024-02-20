function $executePIX(cmd) {
    // Series of points that have already been clipped
    // and converted to integers.
    
    const data = cmd.data;
    const N = (cmd.data_length !== undefined) ? cmd.data_length : data.length;

    // There's surprisingly no performance advantage for tracking
    // whether blending is needed anywhere in the array during
    // submission and extracting that case into a no-blend tiny loop
    // below.
    for (let p = 0; p < N; p += 2) {
        const color = data[p + 1];
        
        // Must be unsigned shift to avoid sign extension
        const a15 = color >>> 12;
        
        if (a15 === 0xf) {
            // No blending
            $screen[data[p]] = color;
        } else {
            // Blend
            
            // No need to force to unsigned int because the alpha channel of the output is always 0xff
            const a = a15 * (1 / 15);
            const offset = data[p];
            let back = $screen[offset];
            let result = 0xF000;
            result |= ((back & 0x0F00) * (1 - a) + (color & 0x0F00) * a + 0.5 * 0x0100) & 0x0F00;
            result |= ((back & 0x00F0) * (1 - a) + (color & 0x00F0) * a + 0.5 * 0x0010) & 0x00F0;
            result |= ((back & 0x000F) * (1 - a) + (color & 0x000F) * a + 0.5) & 0x000F;
            $screen[offset] = result;
        }
    }
}