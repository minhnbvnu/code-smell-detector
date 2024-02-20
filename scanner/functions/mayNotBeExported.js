function mayNotBeExported() {
                if(TypeScript.hasFlag(modifiers, TypeScript.Modifiers.Exported)) {
                    this.reportError("Statement may not be exported");
                }
            }