function clipSave(conditional, x, y, width, height) {
    this.conditionalsStack.push(conditional);
    if (conditional) {
        this.cache.save();
        this.beginPath();
        this.rect(x, y, width, height);
        this.clip();
    }
}