constructor(device, root, scene, renderer, assets) {
        this.device = device;
        this.root = root;
        this.scene = scene;
        this.renderer = renderer;
        this.assets = assets;
        this.shadowMapCache = renderer.shadowMapCache;

        this._tempSet = new Set();
        this._initCalled = false;

        // internal materials used by baking
        this.passMaterials = [];
        this.ambientAOMaterial = null;

        this.fog = '';
        this.ambientLight = new Color();

        // dictionary of spare render targets with color buffer for each used size
        this.renderTargets = new Map();

        this.stats = {
            renderPasses: 0,
            lightmapCount: 0,
            totalRenderTime: 0,
            forwardTime: 0,
            fboTime: 0,
            shadowMapTime: 0,
            compileTime: 0,
            shadersLinked: 0
        };
    }