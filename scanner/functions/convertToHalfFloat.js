function convertToHalfFloat(data) {

            const count = data.length;
            const ret = new Uint16Array(count);
            const float2Half = FloatPacking.float2Half;
            for (let i = 0; i < count; i++) {
                ret[i] = float2Half(data[i]);
            }

            return ret;
        }