function bufferFromString(pnts, size) {
    const buffer = new ArrayBuffer(size);
    const typed = new Uint8Array(buffer);
    let next = 0;
    for (const word of pnts.split(/\s+/)) {
        if (word.length == 2) {
            typed[next++] = parseInt(word, 16);
        }
    }
    assert.equal(next, size);
    return buffer;
}