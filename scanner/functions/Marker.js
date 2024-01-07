constructor(coordinates, opts) {
        super(opts);
        this.type = 'Point';
        if (coordinates) {
            this.setCoordinates(coordinates);
        }
    }