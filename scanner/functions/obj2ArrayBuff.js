function obj2ArrayBuff(obj) {
    const objJSON = JSON.stringify(obj);
    const encoder = new TextEncoder();
    const objUtf8 = encoder.encode(objJSON);
    const objUint8 = new Uint8Array(objUtf8);
    return objUint8.buffer;
}