function TypeDeclaration(nodeType, name, extendsList, implementsList, members) {
                _super.call(this, nodeType, name, members);
            this.extendsList = extendsList;
            this.implementsList = implementsList;
            this.varFlags = TypeScript.VarFlags.None;
        }