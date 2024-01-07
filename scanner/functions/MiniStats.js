constructor(app, options) {
        const device = app.graphicsDevice;

        options = options || MiniStats.getDefaultOptions();

        // create graphs
        this.initGraphs(app, device, options);

        // extract list of words
        const words = new Set(
            ['', 'ms', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.']
                .concat(this.graphs.map(graph => graph.name))
                .concat(options.stats ? options.stats.map(stat => stat.unitsName) : [])
                .filter(item => !!item)
        );

        this.wordAtlas = new WordAtlas(device, words);
        this.sizes = options.sizes;
        this._activeSizeIndex = options.startSizeIndex;

        // create click region so we can resize
        const div = document.createElement('div');
        div.setAttribute('id', 'mini-stats');
        div.style.cssText = 'position:fixed;bottom:0;left:0;background:transparent;';
        document.body.appendChild(div);

        div.addEventListener('mouseenter', (event) => {
            this.opacity = 1.0;
        });

        div.addEventListener('mouseleave', (event) => {
            this.opacity = 0.7;
        });

        div.addEventListener('click', (event) => {
            event.preventDefault();
            if (this._enabled) {
                this.activeSizeIndex = (this.activeSizeIndex + 1) % this.sizes.length;
                this.resize(this.sizes[this.activeSizeIndex].width, this.sizes[this.activeSizeIndex].height, this.sizes[this.activeSizeIndex].graphs);
            }
        });

        device.on('resizecanvas', this.updateDiv, this);
        device.on('losecontext', this.loseContext, this);
        app.on('postrender', this.postRender, this);

        this.app = app;
        this.drawLayer = app.scene.layers.getLayerById(LAYERID_UI);
        this.device = device;
        this.render2d = new Render2d(device);
        this.div = div;

        this.width = 0;
        this.height = 0;
        this.gspacing = 2;
        this.clr = [1, 1, 1, 0.5];

        this._enabled = true;

        // initial resize
        this.activeSizeIndex = this._activeSizeIndex;
    }