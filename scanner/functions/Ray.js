constructor(origin, direction) {
        if (origin) {
            this.origin.copy(origin);
        }
        if (direction) {
            this.direction.copy(direction);
        }
    }