function BasicBlock() {
            this.predecessors = new Array();
            this.index = -1;
            this.markValue = 0;
            this.successors = new Array();
            this.useDef = null;
            this.content = new TypeScript.ASTList();
        }