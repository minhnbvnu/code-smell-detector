function getGridBorderDescriptor(edge) {
    var propName = 'gridBorder' + (edge || '');

    return {
        enumerable: true,
        get: function() {
            return this.var[propName];
        },
        set: function(border) {
            this.var[propName] = border;

            if (!edge) {
                this.var.gridBorderLeft = this.var.gridBorderRight = this.var.gridBorderTop = this.var.gridBorderBottom = border;
            }

            this.grid.resetGridBorder(edge);
        }
    };
}