function Catch(param, body) {
                _super.call(this, TypeScript.NodeType.Catch);
            this.param = param;
            this.body = body;
            this.statement = new ASTSpan();
            this.containedScope = null;
            if(this.param) {
                this.param.varFlags |= TypeScript.VarFlags.AutoInit;
            }
        }