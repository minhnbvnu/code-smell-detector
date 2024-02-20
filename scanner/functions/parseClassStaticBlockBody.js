function parseClassStaticBlockBody() {
                        const savedYieldContext = inYieldContext();
                        const savedAwaitContext = inAwaitContext();
                        setYieldContext(false);
                        setAwaitContext(true);
                        const body = parseBlock(
                        /*ignoreMissingOpenBrace*/
                        false);
                        setYieldContext(savedYieldContext);
                        setAwaitContext(savedAwaitContext);
                        return body;
                    }