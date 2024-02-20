function StoragePolyfil() {
    this.storage = Object.create(null);
    this.keyIndex = [];
    Object.defineProperty(this, "length", {
        enumerable: true,
        get: function() {
            return this.keyIndex.length;
        }
    });
}