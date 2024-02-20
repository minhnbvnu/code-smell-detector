function VariableSymbol(name, location, unitIndex, variable) {
                _super.call(this, name, location, name.length, unitIndex);
            this.variable = variable;
        }