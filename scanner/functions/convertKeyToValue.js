function convertKeyToValue (key) {
    const {type, value} = key;
    switch (type) {
    case 'number': case 'string': {
        return value;
    } case 'array': {
        const array = [];
        const len = value.length;
        let index = 0;
        while (index < len) {
            const entry = convertKeyToValue(value[index]);
            array[index] = entry;
            index++;
        }
        return array;
    } case 'date': {
        return new Date(value);
    } case 'binary': {
        const len = value.length;
        const buffer = new ArrayBuffer(len);
        // Set the entries in buffer's [[ArrayBufferData]] to those in `value`
        const uint8 = new Uint8Array(buffer, value.byteOffset || 0, value.byteLength);
        uint8.set(value);
        return buffer;
    } case 'invalid': default:
        throw new Error('Bad key');
    }
}