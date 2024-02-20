function ModuleType(enclosedTypes, ambientEnclosedTypes) {
                _super.call(this);
            this.enclosedTypes = enclosedTypes;
            this.ambientEnclosedTypes = ambientEnclosedTypes;
            this.importedModules = [];
        }