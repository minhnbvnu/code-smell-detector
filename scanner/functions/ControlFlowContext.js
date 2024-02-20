function ControlFlowContext(current, exit) {
            this.current = current;
            this.exit = exit;
            this.entry = null;
            this.unreachable = null;
            this.noContinuation = false;
            this.statementStack = new Array();
            this.currentSwitch = new Array();
            this.markBase = 0;
            this.linearBBs = new Array();
            this.entry = this.current;
        }