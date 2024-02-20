function $executeSPN(cmd) {
    // Uint16Array formatted in blocks, where the USED length is
    // separately encoded because the array has to be allocated
    // before it is known how much will be used.
    //
    // For each block, the header element specifies:
    //
    // - header & 0x1 is 1 if the entire block has alpha = 0xf and can be memcpy'd
    // - header & 0x2 is 1 if the block has alpha = 0x0 (in which case, there is
    //              no actual data in the block)
    // - header >> 2 is the length of the span. 
    //
    // Blocks with both low bits == 0 *may* have some alpha = 0x0 and
    // some alpha = 0xf pixels in them.
    const data = cmd.data;
    const N = cmd.data_length;

    const dst_step = (cmd.dx + $SCREEN_WIDTH * cmd.dy) | 0;
    let dst_index = (cmd.x + $SCREEN_WIDTH * cmd.y) | 0;
    let src_index = 0;
    
    while (src_index < N) {
        const header = data[src_index++];
        const length = header >> 2;
        
        const skip = header & 0x2;
        if (skip) {
            dst_index += length * dst_step;
        } else {
            const opaque = header & 0x1;
            if (opaque) {
                if (dst_step === 1) {
                    // Horizontal span
                    // Memcpy from data[src_index] to $screen[dst_index]
                    $screen.set(data.subarray(src_index, src_index + length), dst_index);
                    src_index += length;
                    dst_index += length * dst_step;
                } else {
                    // Vertical span
                    for (let i = 0; i < length; ++i, ++src_index, dst_index += dst_step) {
                        $screen[dst_index] = data[src_index];
                    }
                }
            } else {
                // Maybe blend
                for (let i = 0; i < length; ++i, dst_index += dst_step) {
                    const color = data[src_index++];
                    
                    // Must be unsigned shift to avoid sign extension
                    const a15 = color >>> 12;
                    
                    if (a15 === 0xf) {
                        // No blending
                        $screen[dst_index] = color;
                    } else {
                        // Blend
                        
                        // No need to force to unsigned int because the alpha channel of the output is always 0xff
                        const a = a15 * (1 / 15);
                        const back = $screen[dst_index] >>> 0;
                        let result = 0xF000;
                        result |= ((back & 0x0F00) * (1 - a) + (color & 0x0F00) * a + 0.5 * 0x0100) & 0x0F00;
                        result |= ((back & 0x00F0) * (1 - a) + (color & 0x00F0) * a + 0.5 * 0x0010) & 0x00F0;
                        result |= ((back & 0x000F) * (1 - a) + (color & 0x000F) * a + 0.5) & 0x000F;
                        $screen[dst_index] = result;
                    }
                } // loop over pixels
            } // if opaque block
        } // if skip
        
    } // loop over blocks
}