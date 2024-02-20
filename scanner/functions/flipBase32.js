function flipBase32 (encoded) {
    let flipped = '';
    for (const ch of encoded) {
        flipped += (31 - Number.parseInt(ch, 32)).toString(32);
    }
    return flipped;
}