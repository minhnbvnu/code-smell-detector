function swap16(buffer) {
        const x = new Uint8Array(buffer);
        for (let i = 0, end = x.length; i < end; i += 2) {
            const t = x[i];
            x[i] = x[i + 1];
            x[i + 1] = t;
        }
    }