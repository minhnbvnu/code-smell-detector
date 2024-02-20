function beginFinallyBlock() {
                Debug.assert(peekBlockKind() === 0 /* Exception */);
                const exception = peekBlock();
                Debug.assert(exception.state < 2 /* Finally */);
                const endLabel = exception.endLabel;
                emitBreak(endLabel);
                const finallyLabel = defineLabel();
                markLabel(finallyLabel);
                exception.state = 2 /* Finally */;
                exception.finallyLabel = finallyLabel;
            }