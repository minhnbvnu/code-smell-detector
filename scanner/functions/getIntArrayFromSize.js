function getIntArrayFromSize(data, size) {
    if (size <= maxValueUint8) {
        return new Uint8Array(data);
    } else if (size <= maxValueUint16) {
        return new Uint16Array(data);
    } else {
        return new Uint32Array(data);
    }
}