function to_big_endian(values) {
        if (exports.is_little_endian) {
            const result = new Uint32Array(values.length);
            const view = new DataView(result.buffer);
            let j = 0;
            for (const color of values) {
                view.setUint32(j, color);
                j += 4;
            }
            return result;
        }
        else
            return values;
    }