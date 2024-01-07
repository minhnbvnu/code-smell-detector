constructor(app) {
        super();

        this.app = app;

        // The store where all ComponentData objects are kept
        this.store = {};
        this.schema = [];
    }