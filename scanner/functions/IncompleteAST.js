function IncompleteAST(min, lim) {
                _super.call(this, TypeScript.NodeType.Error);
            this.minChar = min;
            this.limChar = lim;
        }