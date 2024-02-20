function ASTList() {
                _super.call(this, TypeScript.NodeType.List);
            this.enclosingScope = null;
            this.members = new Array();
        }