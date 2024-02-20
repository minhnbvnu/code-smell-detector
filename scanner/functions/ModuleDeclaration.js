function ModuleDeclaration(name, members, vars, scopes, endingToken) {
                _super.call(this, TypeScript.NodeType.ModuleDeclaration, name, members);
            this.endingToken = endingToken;
            this.modFlags = TypeScript.ModuleFlags.ShouldEmitModuleDecl;
            this.amdDependencies = [];
            this.containsUnicodeChar = false;
            this.containsUnicodeCharInComment = false;
            this.vars = vars;
            this.scopes = scopes;
            this.prettyName = this.name.actualText;
        }