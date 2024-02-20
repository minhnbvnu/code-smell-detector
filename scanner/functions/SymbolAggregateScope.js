function SymbolAggregateScope(container) {
                _super.call(this, container);
            this.valueCache = null;
            this.valueImplCache = null;
            this.valueAmbientCache = null;
            this.typeCache = null;
            this.typeImplCache = null;
            this.typeAmbientCache = null;
            this.parents = null;
            this.container = container;
        }