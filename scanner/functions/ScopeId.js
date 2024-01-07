constructor(name) {
        /**
         * The variable name.
         *
         * @type {string}
         */
        this.name = name;

        // Set the default value
        this.value = null;

        // Create the version object
        this.versionObject = new VersionedObject();
    }