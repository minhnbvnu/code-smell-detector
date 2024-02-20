function CompilationSettings() {
            this.styleSettings = new StyleSettings();
            this.propagateConstants = false;
            this.minWhitespace = false;
            this.parseOnly = false;
            this.errorRecovery = false;
            this.emitComments = false;
            this.watch = false;
            this.exec = false;
            this.resolve = true;
            this.controlFlow = false;
            this.printControlFlow = false;
            this.controlFlowUseDef = false;
            this.errorOnWith = true;
            this.preprocess = true;
            this.canCallDefinitionSignature = false;
            this.inferPropertiesFromThisAssignment = false;
            this.useDefaultLib = true;
            this.codeGenTarget = TypeScript.CodeGenTarget.ES3;
            this.moduleGenTarget = TypeScript.ModuleGenTarget.Synchronous;
            this.outputOption = "";
            this.mapSourceFiles = false;
            this.generateDeclarationFiles = false;
            this.useCaseSensitiveFileResolution = false;
        }