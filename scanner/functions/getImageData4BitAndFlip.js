function getImageData4BitAndFlip(image, region, options) {
    const data = getImageData4Bit(image, region);

    if (options && options.palette_swap) {
        // Build the lookup table with 2^12 = 4096 entries. Start by
        // mapping every RGB color to itself
        const palette = new Uint16Array(4096);
        for (let i = 0; i < 4096; ++i) {
            palette[i] = i;
        }

        // Now override the individual colors
        for (const src in options.palette_swap) {
            const dst = options.palette_swap[src];
            // Parse src and dst
            if (src[0] !== '#' || dst[0] !== '#' || src.length !== 4 || dst.length !== 4) { throw 'palette_swap colors must have the form "#RGB" in hexadecimal'; }

            // Remove leading zeros
            let src_int = (src === '#000') ? 0 : parseInt(src.substring(1).replace(/^0*/, ''), 16);
            // Byte reorder
            src_int = ((src_int & 0xF) << 8) | (src_int & 0x0F0) | (src_int >> 8);
            
            let dst_int = (dst === '#000') ? 0 : parseInt(dst.substring(1).replace(/^0*/, ''), 16);
            dst_int = ((dst_int & 0xF) << 8) | (dst_int & 0x0F0) | (dst_int >> 8);

            // Store the value
            palette[src_int] = dst_int;
        }
        
        // Replace all values in place, preserving alpha.
        // Most will be unchanged.
        for (let i = 0; i < data.length; ++i) {
            const c = data[i];
            //if (c !== 0) { console.log(c.toString(16)); }
            data[i] = (c & 0xF000) | (palette[c & 0xFFF]);
        }
    }
    
    const flipped = new Uint16Array(data.length);
    flipped.width = data.width;
    flipped.height = data.height;

    for (let y = 0; y < data.height; ++y) {
        for (let x = 0; x < data.width; ++x) {
            const i = x + y * data.width;
            const j = (data.width - 1 - x) + y * data.width;
            flipped[i] = data[j];
        }
    }
    
    return [data, flipped];
}