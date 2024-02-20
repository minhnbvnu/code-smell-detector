function DeclarationEmitter(checker, emitOptions, errorReporter) {
            this.checker = checker;
            this.emitOptions = emitOptions;
            this.errorReporter = errorReporter;
            this.declFile = null;
            this.indenter = new TypeScript.Indenter();
            this.declarationContainerStack = [];
            this.isDottedModuleName = [];
            this.ignoreCallbackAst = null;
            this.singleDeclFile = null;
            this.varListCount = 0;
        }