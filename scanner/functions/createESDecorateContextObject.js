function createESDecorateContextObject(contextIn) {
                return contextIn.kind === "class" ? createESDecorateClassContextObject(contextIn) : createESDecorateClassElementContextObject(contextIn);
            }