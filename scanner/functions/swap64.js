function swap64(buffer) {
        const x = new Uint8Array(buffer);
        for (let i = 0, end = x.length; i < end; i += 8) {
            let t = x[i];
            x[i] = x[i + 7];
            x[i + 7] = t;
            t = x[i + 1];
            x[i + 1] = x[i + 6];
            x[i + 6] = t;
            t = x[i + 2];
            x[i + 2] = x[i + 5];
            x[i + 5] = t;
            t = x[i + 3];
            x[i + 3] = x[i + 4];
            x[i + 4] = t;
        }
    }