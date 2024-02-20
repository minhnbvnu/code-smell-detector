function ParameterSymbol(name, location, unitIndex, parameter) {
                _super.call(this, name, location, name.length, unitIndex);
            this.parameter = parameter;
            this.paramDocComment = null;
            this.funcDecl = null;
            this.argsOffset = (-1);
            this.name = name;
            this.location = location;
        }