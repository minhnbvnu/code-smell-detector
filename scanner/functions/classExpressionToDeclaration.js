function classExpressionToDeclaration(name, additionalModifiers, cls, useSitesToUnqualify) {
            return factory.createClassDeclaration(concatenate(additionalModifiers, getSynthesizedDeepClones(cls.modifiers)), name, getSynthesizedDeepClones(cls.typeParameters), getSynthesizedDeepClones(cls.heritageClauses), replaceImportUseSites(cls.members, useSitesToUnqualify));
        }