function isSpreadableProperty(prop) {
                var _a2;
                return !some(prop.declarations, isPrivateIdentifierClassElementDeclaration) && (!(prop.flags & (8192 /* Method */ | 32768 /* GetAccessor */ | 65536 /* SetAccessor */)) || !((_a2 = prop.declarations) == null ? void 0 : _a2.some((decl) => isClassLike(decl.parent))));
            }