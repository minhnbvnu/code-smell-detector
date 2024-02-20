function $gpu_execute(commandList, backgroundSpritesheetIndex, backgroundColor16) {
    const startTime = performance.now();
    
    // clear the screen
    if (backgroundSpritesheetIndex !== undefined) {
        // Image background
        $screen.set($spritesheetArray[backgroundSpritesheetIndex].$uint16Data);
    } else {
        // Color background (force alpha = 1)
        $screen.fill(backgroundColor16, 0, $screen.length);
    }

    // Sort
    commandList.sort($zSort);
    
    // Eval draw list
    for (let i = 0; i < commandList.length; ++i) {
        const cmd = commandList[i];
        $executeTable[cmd.opcode](cmd);
    }

    {
        // Convert 16-bit to 32-bit
        const dst32 = $updateImageData32;
        const src32 = $screen32;
        const N = src32.length;
        for (let s = 0, d = 0; s < N; ++s) {
            // Read two 16-bit pixels at once
            let src = src32[s];
            
            // Turn into two 32-bit pixels as ABGR -> FFBBGGRR. Only
            // read color channels, as the alpha channel is overwritten with fully
            // opaque.
            let C = ((src & 0x0f00) << 8) | ((src & 0x00f0) << 4) | (src & 0x000f);
            dst32[d] = 0xff000000 | C | (C << 4); ++d; src = src >> 16;
            
            C = ((src & 0x0f00) << 8) | ((src & 0x00f0) << 4) | (src & 0x000f);
            dst32[d] = 0xff000000 | C | (C << 4); ++d;
        }
    }
    
    if ($is_web_worker) {
        // console.log('Transferring updateImageData back to CPU thread');
        postMessage({type: 'submitFrame', gpuTime: performance.now() - startTime, updateImageData: $updateImageData, updateImageData32: $updateImageData32}, [$updateImageData32.buffer]);
        $updateImageData = null;
        $updateImageData32 = null;
    } else {
        $submitFrame($updateImageData, $updateImageData32);
    }
}