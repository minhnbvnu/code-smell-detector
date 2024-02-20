function bindEachFunctionsFirst(nodes) {
                bindEach(nodes, (n) => n.kind === 259 /* FunctionDeclaration */ ? bind(n) : void 0);
                bindEach(nodes, (n) => n.kind !== 259 /* FunctionDeclaration */ ? bind(n) : void 0);
            }