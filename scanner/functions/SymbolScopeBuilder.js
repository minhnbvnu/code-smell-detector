function SymbolScopeBuilder(valueMembers, ambientValueMembers, enclosedTypes, ambientEnclosedTypes, parent, container) {
                _super.call(this, container);
            this.valueMembers = valueMembers;
            this.ambientValueMembers = ambientValueMembers;
            this.enclosedTypes = enclosedTypes;
            this.ambientEnclosedTypes = ambientEnclosedTypes;
            this.parent = parent;
            this.container = container;
        }