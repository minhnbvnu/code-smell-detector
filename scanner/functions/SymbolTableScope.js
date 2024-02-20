function SymbolTableScope(valueMembers, ambientValueMembers, enclosedTypes, ambientEnclosedTypes, container) {
                _super.call(this, container);
            this.valueMembers = valueMembers;
            this.ambientValueMembers = ambientValueMembers;
            this.enclosedTypes = enclosedTypes;
            this.ambientEnclosedTypes = ambientEnclosedTypes;
            this.container = container;
        }