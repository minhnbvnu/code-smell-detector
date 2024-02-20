function Mime() {
        // Map of extension -> mime type
        this.types = Object.create(null);
        // Map of mime type -> extension
        this.extensions = Object.create(null);
    }