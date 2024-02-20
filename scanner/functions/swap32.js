function swap32(buffer) {
        const x = new Uint8Array(buffer);
        for (let i = 0, end = x.length; i < end; i += 4) {
            let t = x[i];
            x[i] = x[i + 3];
            x[i + 3] = t;
            t = x[i + 1];
            x[i + 1] = x[i + 2];
            x[i + 2] = t;
        }
    }