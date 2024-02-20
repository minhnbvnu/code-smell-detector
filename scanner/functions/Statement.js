function Statement(nodeType) {
                _super.call(this, nodeType);
            this.flags |= TypeScript.ASTFlags.IsStatement;
        }