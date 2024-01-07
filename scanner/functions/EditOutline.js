constructor(target, map) {
        this.target = target;
        target.once('remove', this.delete, this);
        this.map = map;
        this.addTo(map);
    }