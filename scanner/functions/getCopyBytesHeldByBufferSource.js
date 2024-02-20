function getCopyBytesHeldByBufferSource (O) {
    let offset = 0;
    let length = 0;
    if (ArrayBuffer.isView(O)) { // Has [[ViewedArrayBuffer]] internal slot
        const arrayBuffer = O.buffer;
        if (arrayBuffer === undefined) {
            throw new TypeError(
                'Could not copy the bytes held by a buffer source as the buffer was undefined.'
            );
        }
        offset = O.byteOffset; // [[ByteOffset]] (will also throw as desired if detached)
        length = O.byteLength; // [[ByteLength]] (will also throw as desired if detached)
    } else {
        length = O.byteLength; // [[ArrayBufferByteLength]] on ArrayBuffer (will also throw as desired if detached)
    }
    // const octets = new Uint8Array(input);
    // const octets = types.binary.decode(types.binary.encode(input));
    return new Uint8Array(
        // Should allow DataView
        /** @type {ArrayBuffer} */
        (('buffer' in O && O.buffer) || O),
        offset,
        length
    );
}