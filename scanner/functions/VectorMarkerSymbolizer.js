constructor(symbol, geometry, painter) {
        super(symbol, geometry, painter);
        const style = this.translate();
        this._dynamic = hasFunctionDefinition(style);
        this.style = this._defineStyle(style);
        this.strokeAndFill = this._defineStyle(translateMarkerLineAndFill(this.style));
        // const lineWidth = this.strokeAndFill['lineWidth'];
        // if (lineWidth % 2 === 0) {
        //     this.padding = 2;
        // } else {
        //     this.padding = 1.5;
        // }
        this.padding = 0;
    }