function isInitializedProperty(member) {
            return member.kind === 169 /* PropertyDeclaration */ && member.initializer !== void 0;
        }