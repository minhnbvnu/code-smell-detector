constructor() {
        // Increment the global object ID counter
        idCounter++;

        // Create a version for this object
        this.version = new Version();

        // Set the unique object ID
        this.version.globalId = idCounter;
    }