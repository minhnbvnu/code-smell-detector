function EmitState() {
            this.column = 0;
            this.line = 0;
            this.pretty = false;
            this.inObjectLiteral = false;
            this.container = EmitContainer.Prog;
        }