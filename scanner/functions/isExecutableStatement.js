function isExecutableStatement(s) {
            return !isFunctionDeclaration(s) && !isPurelyTypeDeclaration(s) && !isEnumDeclaration(s) && // `var x;` may declare a variable used above
                !(isVariableStatement(s) && !(getCombinedNodeFlags(s) & (1 /* Let */ | 2 /* Const */)) && s.declarationList.declarations.some((d) => !d.initializer));
        }