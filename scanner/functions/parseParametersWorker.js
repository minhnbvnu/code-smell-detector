function parseParametersWorker(flags, allowAmbiguity) {
                        const savedYieldContext = inYieldContext();
                        const savedAwaitContext = inAwaitContext();
                        setYieldContext(!!(flags & 1 /* Yield */));
                        setAwaitContext(!!(flags & 2 /* Await */));
                        const parameters = flags & 32 /* JSDoc */ ? parseDelimitedList(17 /* JSDocParameters */, parseJSDocParameter) : parseDelimitedList(16 /* Parameters */, () => allowAmbiguity ? parseParameter(savedAwaitContext) : parseParameterForSpeculation(savedAwaitContext));
                        setYieldContext(savedYieldContext);
                        setAwaitContext(savedAwaitContext);
                        return parameters;
                    }