function getMappedTypeModifiers(type) {
                const declaration = type.declaration;
                return (declaration.readonlyToken ? declaration.readonlyToken.kind === 40 /* MinusToken */ ? 2 /* ExcludeReadonly */ : 1 /* IncludeReadonly */ : 0) | (declaration.questionToken ? declaration.questionToken.kind === 40 /* MinusToken */ ? 8 /* ExcludeOptional */ : 4 /* IncludeOptional */ : 0);
            }