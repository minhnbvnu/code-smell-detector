constructor() {
        // Create an identity matrix. Note that a new Float32Array has all elements set
        // to zero by default, so we only need to set the relevant elements to one.
        this.data[0] = this.data[4] = this.data[8] = 1;
    }