function BoundDecl(id, nodeType, nestingLevel) {
                _super.call(this, nodeType);
            this.id = id;
            this.nestingLevel = nestingLevel;
            this.init = null;
            this.typeExpr = null;
            this.varFlags = TypeScript.VarFlags.None;
            this.sym = null;
        }