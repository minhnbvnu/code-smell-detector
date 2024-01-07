function convertToUint(data) {

            const count = data.length;
            const ret = new Uint8ClampedArray(count);
            for (let i = 0; i < count; i++) {
                ret[i] = data[i] * 255;
            }

            return ret;
        }