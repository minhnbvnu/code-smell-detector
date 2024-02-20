function signatureToDisplayParts(typechecker, signature, enclosingDeclaration, flags = 0 /* None */) {
            flags |= 16384 /* UseAliasDefinedOutsideCurrentScope */ | 1024 /* MultilineObjectLiterals */ | 32 /* WriteTypeArgumentsOfSignature */ | 8192 /* OmitParameterModifiers */;
            return mapToDisplayParts((writer) => {
                typechecker.writeSignature(signature, enclosingDeclaration, flags, 
                /*signatureKind*/
                void 0, writer);
            });
        }