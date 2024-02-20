function isNamespaceMember(p) {
                        return !!(p.flags & (788968 /* Type */ | 1920 /* Namespace */ | 2097152 /* Alias */)) || !(p.flags & 4194304 /* Prototype */ || p.escapedName === "prototype" || p.valueDeclaration && isStatic(p.valueDeclaration) && isClassLike(p.valueDeclaration.parent));
                    }