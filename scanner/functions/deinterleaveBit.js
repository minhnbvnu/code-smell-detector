function deinterleaveBit(bit, len) {
    let h = Math.ceil(len / 2);
    let stride = Math.floor(bit / 2);
    let group = bit % 2;
    return stride + group * h;
}