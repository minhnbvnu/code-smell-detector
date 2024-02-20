function inferFromSignature(source, target) {
                    const saveBivariant = bivariant;
                    const kind = target.declaration ? target.declaration.kind : 0 /* Unknown */;
                    bivariant = bivariant || kind === 171 /* MethodDeclaration */ || kind === 170 /* MethodSignature */ || kind === 173 /* Constructor */;
                    applyToParameterTypes(source, target, inferFromContravariantTypesIfStrictFunctionTypes);
                    bivariant = saveBivariant;
                    applyToReturnTypes(source, target, inferFromTypes);
                }