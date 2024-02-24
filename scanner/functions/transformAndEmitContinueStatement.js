function transformAndEmitContinueStatement(node) {
                const label = findContinueTarget(node.label ? idText(node.label) : void 0);
                if (label > 0) {
                    emitBreak(label, 
                    /*location*/
                    node);
                }
                else {
                    emitStatement(node);
                }
            }