constructor(app) {
        const assets = app.assets;
        const device = app.graphicsDevice;

        this._device = device;
        this._assets = assets;

        // img parser handles all browser-supported image formats, this
        // parser will be used when other more specific parsers are not found.
        this.imgParser = new ImgParser(assets, device);

        this.parsers = {
            dds: new DdsParser(assets),
            ktx: new KtxParser(assets),
            ktx2: new Ktx2Parser(assets, device),
            basis: new BasisParser(assets, device),
            hdr: new HdrParser(assets)
        };
    }