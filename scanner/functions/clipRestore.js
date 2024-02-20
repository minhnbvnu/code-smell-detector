function clipRestore(conditional) {
    if (this.conditionalsStack.pop()) {
        this.cache.restore(); // Remove clip region
    }
}