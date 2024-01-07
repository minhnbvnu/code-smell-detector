constructor(symbol, geometry, painter) {
        //IE must have a valid width and height to draw a svg image
        //otherwise, error will be thrown
        if (isNil(symbol['markerWidth'])) {
            symbol['markerWidth'] = 80;
        }
        if (isNil(symbol['markerHeight'])) {
            symbol['markerHeight'] = 80;
        }
        super(symbol, geometry, painter);
        symbol = extend(symbol, this.translate());
        const style = this.style = this._defineStyle(symbol);
        if (Browser.gecko) {
            // Firefox requires valid width and height attributes in SVG's root element.
            this._url = [getMarkerPathBase64(style, style['markerWidth'], style['markerHeight']), style['markerWidth'], style['markerHeight']];
        } else {
            this._url = [getMarkerPathBase64(style), style['markerWidth'], style['markerHeight']];
        }
    }