constructor(x = 0, y = 0, z = 0) {
        if (x.length === 3) {
            this.x = x[0];
            this.y = x[1];
            this.z = x[2];
        } else {
            this.x = x;
            this.y = y;
            this.z = z;
        }
    }