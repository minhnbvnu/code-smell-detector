function acceptValue(value) {
    if (this.isDestroying || this.isDestroyed) {
        return;
    }

    if (this.get('normValue') !== value) {
        this.sendAction('changeValue', value);
    }
}