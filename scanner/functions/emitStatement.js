function emitStatement(node) {
                if (node) {
                    emitWorker(1 /* Statement */, [node]);
                }
                else {
                    emitNop();
                }
            }