function createColumns() {
    this.schema.forEach(function(columnSchema) {
        this.addColumn(columnSchema);
    }, this);

    this.columnEnumSynchronize();
}