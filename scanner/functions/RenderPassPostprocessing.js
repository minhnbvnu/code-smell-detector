constructor(device, renderer, renderAction) {
        super(device);
        this.renderer = renderer;
        this.renderAction = renderAction;

        this.requiresCubemaps = false;
    }