function convertToRGBA(buffers, newBuffers, defaultAlpha) {
    const { width, height } = buffers;

    for (let i = 0; i < width * height; i++) {
        const oldIndex = i * 3;
        const index = i * 4;
        // Copy RGB from original buffer
        newBuffers[index + 0] = buffers[oldIndex + 0]; // R
        newBuffers[index + 1] = buffers[oldIndex + 1]; // G
        newBuffers[index + 2] = buffers[oldIndex + 2]; // B
        // Add alpha to new buffer
        newBuffers[index + 3] = defaultAlpha; // A
    }

    return newBuffers;
}