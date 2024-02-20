function parseFunctionBlock(flags, diagnosticMessage) {
                        const savedYieldContext = inYieldContext();
                        setYieldContext(!!(flags & 1 /* Yield */));
                        const savedAwaitContext = inAwaitContext();
                        setAwaitContext(!!(flags & 2 /* Await */));
                        const savedTopLevel = topLevel;
                        topLevel = false;
                        const saveDecoratorContext = inDecoratorContext();
                        if (saveDecoratorContext) {
                            setDecoratorContext(
                            /*val*/
                            false);
                        }
                        const block = parseBlock(!!(flags & 16 /* IgnoreMissingOpenBrace */), diagnosticMessage);
                        if (saveDecoratorContext) {
                            setDecoratorContext(
                            /*val*/
                            true);
                        }
                        topLevel = savedTopLevel;
                        setYieldContext(savedYieldContext);
                        setAwaitContext(savedAwaitContext);
                        return block;
                    }