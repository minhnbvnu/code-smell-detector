function getAllDecoratorsOfClassElement(member, parent2, useLegacyDecorators) {
            switch (member.kind) {
                case 174 /* GetAccessor */:
                case 175 /* SetAccessor */:
                    if (!useLegacyDecorators) {
                        return getAllDecoratorsOfMethod(member);
                    }
                    return getAllDecoratorsOfAccessors(member, parent2);
                case 171 /* MethodDeclaration */:
                    return getAllDecoratorsOfMethod(member);
                case 169 /* PropertyDeclaration */:
                    return getAllDecoratorsOfProperty(member);
                default:
                    return void 0;
            }
        }