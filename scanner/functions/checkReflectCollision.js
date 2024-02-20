function checkReflectCollision(node) {
                let hasCollision = false;
                if (isClassExpression(node)) {
                    for (const member of node.members) {
                        if (getNodeCheckFlags(member) & 8388608 /* ContainsSuperPropertyInStaticInitializer */) {
                            hasCollision = true;
                            break;
                        }
                    }
                }
                else if (isFunctionExpression(node)) {
                    if (getNodeCheckFlags(node) & 8388608 /* ContainsSuperPropertyInStaticInitializer */) {
                        hasCollision = true;
                    }
                }
                else {
                    const container = getEnclosingBlockScopeContainer(node);
                    if (container && getNodeCheckFlags(container) & 8388608 /* ContainsSuperPropertyInStaticInitializer */) {
                        hasCollision = true;
                    }
                }
                if (hasCollision) {
                    Debug.assert(isNamedDeclaration(node) && isIdentifier(node.name), "The target of a Reflect collision check should be an identifier");
                    errorSkippedOn("noEmit", node, Diagnostics.Duplicate_identifier_0_Compiler_reserves_name_1_when_emitting_super_references_in_static_initializers, declarationNameToString(node.name), "Reflect");
                }
            }