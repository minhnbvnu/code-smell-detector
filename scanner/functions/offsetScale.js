function offsetScale(data, offset, scale) {

            const count = data.length;
            const ret = new Float32Array(count);
            for (let i = 0; i < count; i++) {
                const n = i % 4;
                ret[i] = (data[i] + offset[n]) * scale[n];
            }
            return ret;
        }