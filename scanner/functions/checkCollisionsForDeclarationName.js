function checkCollisionsForDeclarationName(node, name) {
                if (!name)
                    return;
                checkCollisionWithRequireExportsInGeneratedCode(node, name);
                checkCollisionWithGlobalPromiseInGeneratedCode(node, name);
                recordPotentialCollisionWithWeakMapSetInGeneratedCode(node, name);
                recordPotentialCollisionWithReflectInGeneratedCode(node, name);
                if (isClassLike(node)) {
                    checkTypeNameIsReserved(name, Diagnostics.Class_name_cannot_be_0);
                    if (!(node.flags & 16777216 /* Ambient */)) {
                        checkClassNameCollisionWithObject(name);
                    }
                }
                else if (isEnumDeclaration(node)) {
                    checkTypeNameIsReserved(name, Diagnostics.Enum_name_cannot_be_0);
                }
            }