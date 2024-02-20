function AST(nodeType) {
                _super.call(this);
            this.nodeType = nodeType;
            this.type = null;
            this.flags = TypeScript.ASTFlags.Writeable;
            this.passCreated = TypeScript.CompilerDiagnostics.analysisPass;
            this.preComments = null;
            this.postComments = null;
            this.docComments = null;
            this.isParenthesized = false;
        }