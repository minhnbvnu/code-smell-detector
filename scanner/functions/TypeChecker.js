function TypeChecker(persistentState) {
            this.persistentState = persistentState;
            this.errorReporter = null;
            this.checkControlFlow = false;
            this.printControlFlowGraph = false;
            this.checkControlFlowUseDef = false;
            this.styleSettings = null;
            this.units = null;
            this.anon = "_anonymous";
            this.locationInfo = null;
            this.typeFlow = null;
            this.currentCompareA = null;
            this.currentCompareB = null;
            this.currentModDecl = null;
            this.inBind = false;
            this.inWith = false;
            this.errorsOnWith = true;
            this.currentContextualTypeContext = null;
            this.resolvingBases = false;
            this.canCallDefinitionSignature = false;
            this.assignableCache = {
            };
            this.subtypeCache = {
            };
            this.identicalCache = {
            };
            this.provisionalStartedTypecheckObjects = [];
            this.mustCaptureGlobalThis = false;
            this.voidType = this.persistentState.voidType;
            this.booleanType = this.persistentState.booleanType;
            this.numberType = this.persistentState.doubleType;
            this.stringType = this.persistentState.stringType;
            this.anyType = this.persistentState.anyType;
            this.nullType = this.persistentState.nullType;
            this.undefinedType = this.persistentState.undefinedType;
            this.globals = this.persistentState.dualGlobalValues;
            this.globalTypes = this.persistentState.dualGlobalTypes;
            this.ambientGlobals = this.persistentState.dualAmbientGlobalValues;
            this.ambientGlobalTypes = this.persistentState.dualAmbientGlobalTypes;
            this.gloModType = this.persistentState.mod;
            this.gloMod = this.persistentState.gloMod;
            this.wildElm = this.persistentState.wildElm;
            this.globalScope = this.persistentState.globalScope;
            this.typingContextStack = new ContextualTypingContextStack(this);
        }