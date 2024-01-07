constructor(name) {
        /**
         * The scope name.
         *
         * @type {string}
         */
        this.name = name;

        // Create map which maps a uniform name into ScopeId
        this.variables = new Map();
    }