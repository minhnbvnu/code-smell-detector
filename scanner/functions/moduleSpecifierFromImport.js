function moduleSpecifierFromImport(i) {
            return i.kind === 269 /* ImportDeclaration */ ? i.moduleSpecifier : i.kind === 268 /* ImportEqualsDeclaration */ ? i.moduleReference.expression : i.initializer.arguments[0];
        }