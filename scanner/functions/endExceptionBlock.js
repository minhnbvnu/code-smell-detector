function endExceptionBlock() {
                Debug.assert(peekBlockKind() === 0 /* Exception */);
                const exception = endBlock();
                const state2 = exception.state;
                if (state2 < 2 /* Finally */) {
                    emitBreak(exception.endLabel);
                }
                else {
                    emitEndfinally();
                }
                markLabel(exception.endLabel);
                emitNop();
                exception.state = 3 /* Done */;
            }