function processPreviewRecording() {
    const targetX = (previewRecordingFrame % PREVIEW_FRAMES_X) * 192;
    const targetY = Math.floor(previewRecordingFrame / PREVIEW_FRAMES_X) * 112;

    // Process differently depending on the screen resolution
    if (SCREEN_WIDTH === 384 && SCREEN_HEIGHT === 224) {
        // Full resolution. Average pixels down to half resolution
        for (let y = 0; y < 112; ++y) {
            let dstOffset = (y + targetY) * 192 * PREVIEW_FRAMES_X + targetX;
            for (let x = 0; x < 192; ++dstOffset, ++x) {
                // Average four pixels.
                let r = 0, g = 0, b = 0;

                for (let dy = 0; dy <= 1; ++dy) {
                    for (let dx = 0; dx <= 1; ++dx) {
                        const src = updateImageData32[(x * 2 + dx) + (y * 2 + dy) * 384];
                        r += (src >>> 16) & 0xff;
                        g += (src >>> 8) & 0xff;
                        b += src & 0xff;
                    } // dx
                } // dy

                // Divide each by 4 and store
                previewRecording[dstOffset] = (((r >> 2) & 0xff) << 16) + (((g >> 2) & 0xff) << 8) + ((b >> 2) & 0xff);
            } // x
        } // y
    } else if (SCREEN_WIDTH === 320 && SCREEN_HEIGHT === 180) {
        // Crop
        for (let y = 0; y < 112; ++y) {
            const offset = (y + 22) * 320 + 64;
            previewRecording.set(updateImageData32.slice(offset, offset + 192, targetX + (targetY + y) * 192 * PREVIEW_FRAMES_X));
        }
    } else if (SCREEN_WIDTH === 192 && SCREEN_HEIGHT === 112) {
        // Half-resolution. Copy lines directly
        for (let y = 0; y < 112; ++y) {
            previewRecording.set(updateImageData32.slice(y * 192, (y + 1) * 192), targetX + (targetY + y) * 192 * PREVIEW_FRAMES_X);
        }
    } else if (SCREEN_WIDTH === 128 && SCREEN_HEIGHT === 128) {
        // 128x128. Crop
        for (let y = 0; y < 112; ++y) {
            previewRecording.set(updateImageData32.slice((y + 8) * 128, (y + 9) * 128), (targetX + 32) + (targetY + y) * 192 * PREVIEW_FRAMES_X);
        }
    } else if (SCREEN_WIDTH === 128 && SCREEN_HEIGHT === 128) {
        // 64x64. Copy
        for (let y = 0; y < 64; ++y) {
            previewRecording.set(updateImageData32.slice(y * 64, (y + 1) * 64), (targetX + 64) + (targetY + y + 64) * 192 * PREVIEW_FRAMES_X);
        }
    } else {
        alert('Preview recording not supported at this resolution');
        throw new Error('Preview recording not supported at this resolution');
    }
    
    ++previewRecordingFrame;
    if (previewRecordingFrame >= PREVIEW_FRAMES_X * PREVIEW_FRAMES_Y) {
        // Set the alpha channel and reduce to 4:4:4
        for (let i = 0; i < previewRecording.length; ++i) {
            const c = previewRecording[i];
            const r = (c >>> 20) & 0xf;
            const g = (c >>> 12) & 0xf;
            const b = (c >>> 4)  & 0xf;
            previewRecording[i] = 0xff000000 | (r << 20) | (r << 16) | (g << 12) | (g << 8) | (b << 4) | b;
        }
        
        // Copy over data to a canvas
        const img = document.createElement('canvas');
        img.width = 192 * PREVIEW_FRAMES_X; img.height = 112 * PREVIEW_FRAMES_Y;
        const imgCTX = img.getContext('2d');
        const data = imgCTX.createImageData(img.width, img.height);
        new Uint32Array(data.data.buffer).set(previewRecording);
        imgCTX.putImageData(data, 0, 0);

        // Display the result
        // Download the result
        download(img.toDataURL(), 'preview.png');
        previewRecordingFrame = 0;
        previewRecording = null;
    }
}