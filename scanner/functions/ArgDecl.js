function ArgDecl(id) {
                _super.call(this, id, TypeScript.NodeType.ArgDecl, 0);
            this.isOptional = false;
            this.parameterPropertySym = null;
        }