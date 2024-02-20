function TypeScriptCompiler(errorOutput, logger, settings) {
            if (typeof logger === "undefined") { logger = new TypeScript.NullLogger(); }
            if (typeof settings === "undefined") { settings = TypeScript.defaultSettings; }
            this.errorOutput = errorOutput;
            this.logger = logger;
            this.settings = settings;
            this.parser = new TypeScript.Parser();
            this.typeFlow = null;
            this.scripts = new TypeScript.ASTList();
            this.units = new Array();
            this.errorReporter = new TypeScript.ErrorReporter(this.errorOutput);
            this.persistentTypeState = new TypeScript.PersistentGlobalTypeState(this.errorReporter);
            this.errorReporter.parser = this.parser;
            this.initTypeChecker(this.errorOutput);
            this.parser.style_requireSemi = this.settings.styleSettings.requireSemi;
            this.parser.style_funcInLoop = this.settings.styleSettings.funcInLoop;
            this.parser.inferPropertiesFromThisAssignment = this.settings.inferPropertiesFromThisAssignment;
            this.emitSettings = new TypeScript.EmitOptions(this.settings);
            TypeScript.codeGenTarget = settings.codeGenTarget;
        }