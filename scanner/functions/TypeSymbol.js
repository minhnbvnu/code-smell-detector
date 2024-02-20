function TypeSymbol(locName, location, length, unitIndex, type) {
                _super.call(this, locName, location, length, unitIndex);
            this.type = type;
            this.expansions = [];
            this.expansionsDeclAST = [];
            this.isDynamic = false;
            this.isMethod = false;
            this.aliasLink = null;
            this.onlyReferencedAsTypeRef = TypeScript.optimizeModuleCodeGen;
            this.prettyName = this.name;
        }