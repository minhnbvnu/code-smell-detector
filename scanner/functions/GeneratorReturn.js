function GeneratorReturn(value) {
    if (typeof value === "undefined")
        return StopIteration;
    this.value = value;
}