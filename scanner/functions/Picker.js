constructor(app, width, height) {
        if (app instanceof GraphicsDevice) {
            app = getApplication();
            Debug.deprecated('pc.Picker now takes pc.AppBase as first argument. Passing pc.GraphicsDevice is deprecated.');
        }

        // Note: The only reason this class needs the app is to access the renderer. Ideally we remove this dependency and move
        // the Picker from framework to the scene level, or even the extras.
        this.renderer = app.renderer;
        this.device = app.graphicsDevice;

        this.renderPass = new RenderPassPicker(this.device, app.renderer);

        this.width = 0;
        this.height = 0;
        this.resize(width, height);
    }