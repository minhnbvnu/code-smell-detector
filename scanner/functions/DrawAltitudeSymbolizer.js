constructor(symbol, geometry, painter) {
        super(symbol, geometry, painter);
        this.style = geometry.getLayer().options['drawAltitude'];
        if (!this.style || !isObject(this.style)) {
            this.style = {
                'lineWidth': 2
            };
        }
        if (!this.style['lineWidth']) {
            // for get2DExtent
            this.style['lineWidth'] = 0;
        }
        this.dxdy = this._defineStyle({
            'dx': symbol['textDx'] || symbol['markerDx'],
            'dy': symbol['textDy'] || symbol['markerDy']
        });
    }