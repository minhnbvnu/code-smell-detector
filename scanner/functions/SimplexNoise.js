function SimplexNoise(random) {
        if (!random) random = Math.random;
        this.p = new Uint8Array(256);
        this.perm = new Uint8Array(512);
        this.permMod12 = new Uint8Array(512);
        for (var i = 0; i < 256; i++) {
            this.p[i] = random() * 256;
        }
        for (i = 0; i < 512; i++) {
            this.perm[i] = this.p[i & 255];
            this.permMod12[i] = this.perm[i] % 12;
        }

    }