constructor(target, map, options) {
        super(options);
        this.target = target;
        target.once('remove', this.delete, this);
        const symbol = this.options['symbol'];
        const lineWidth = symbol['markerLineWidth'] || 1;
        this.w = symbol['markerWidth'] + lineWidth;
        this.h = symbol['markerHeight'] + lineWidth;
        this.opacity = isNil(symbol['opacity']) ? 1 : symbol['opacity'];
        this.map = map;
        this.events = options.events;
        this._fetchImage();
        this.addTo(map);
    }