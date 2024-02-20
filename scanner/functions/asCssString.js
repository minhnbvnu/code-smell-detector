function asCssString() {
            return _.reduce(this, toCssProperty, '');
        }