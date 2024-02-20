function EnclosingScopeContext(logger, script, text, pos, isMemberCompletion) {
            this.logger = logger;
            this.script = script;
            this.text = text;
            this.pos = pos;
            this.isMemberCompletion = isMemberCompletion;
            this.scopeGetter = null;
            this.objectLiteralScopeGetter = null;
            this.scopeStartAST = null;
            this.skipNextFuncDeclForClass = false;
            this.deepestModuleDecl = null;
            this.enclosingClassDecl = null;
            this.enclosingObjectLit = null;
            this.publicsOnly = true;
            this.useFullAst = false;
        }