function changeValue(value) {
    this.setProperties({
        changingValue: value,
    });
    debounce(this, acceptValue, value, 300);
}