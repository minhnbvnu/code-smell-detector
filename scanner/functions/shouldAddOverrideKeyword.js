function shouldAddOverrideKeyword() {
                return !!(context.program.getCompilerOptions().noImplicitOverride && declaration && hasAbstractModifier(declaration));
            }