function CodeGenerator(builderName, binder, indent) {
            this._builderName = builderName;
            this._binder = binder;
            this._normalMode = false;
            this._indent = indent;
            this._indentLevel = 0;
            this._builderVar = "$$_builder_$$_" + (__jscex__tempVarSeed++);
        }