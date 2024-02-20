function createColumnProperties() {
    var column = this,
        tableState = column.behavior.grid.properties,
        properties;

    properties = Object.create(tableState, {

        index: { // read-only (no setter)
            get: function() {
                return column.index;
            }
        },

        name: { // read-only (no setter)
           get: function() {
                return column.name;
            }
        },

        field: { // read-only (no setter)
            get: function() {
                return column.name;
            }
        },

        columnName: { // read-only (no setter)
            get: function() {
                return column.name;
            }
        },

        header: {
            get: function() {
                return column.header;
            },
            set: function(header) {
                if (this !== column.properties) {
                    tableState.header = header; // throws an error
                }
                column.header = header;
            }
        },

        type: {
            get: function() {
                return column.type;
            },
            set: function(type) {
                if (this !== column.properties) {
                    tableState.type = type; // throws an error
                }
                column.type = type;
            }
        },

        calculator: {
            get: function() {
                return column.calculator;
            },
            set: function(calculator) {
                if (this !== column.properties) {
                    tableState.calculator = calculator; // throws an error
                }
                column.calculator = calculator;
            }
        },

        toJSON: {
            // although we don't generally want header, type, and calculator to be enumerable, we do want them to be serializable
            value: function() {
                return Object.assign({
                    header: this.header,
                    type: this.type,
                    calculator: this.calculator
                }, this);
            }
        }

    });

    Object.defineProperties(properties, {
        rowHeader: { value: Object.create(properties, createColumnProperties.rowHeaderDescriptors) },
        treeHeader: { value: Object.create(properties, createColumnProperties.treeHeaderDescriptors) },
        columnHeader: { value: Object.create(properties, createColumnProperties.columnHeaderDescriptors) },
        filterProperties: { value: Object.create(properties, createColumnProperties.filterDescriptors) }
    });

    switch (column.index) {
        case column.behavior.treeColumnIndex: properties = properties.treeHeader; break;
        case column.behavior.rowColumnIndex: properties = properties.rowHeader; break;
    }

    return properties;
}