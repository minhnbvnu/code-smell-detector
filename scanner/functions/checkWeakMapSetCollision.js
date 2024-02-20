function checkWeakMapSetCollision(node) {
                const enclosingBlockScope = getEnclosingBlockScopeContainer(node);
                if (getNodeCheckFlags(enclosingBlockScope) & 4194304 /* ContainsClassWithPrivateIdentifiers */) {
                    Debug.assert(isNamedDeclaration(node) && isIdentifier(node.name) && typeof node.name.escapedText === "string", "The target of a WeakMap/WeakSet collision check should be an identifier");
                    errorSkippedOn("noEmit", node, Diagnostics.Compiler_reserves_name_0_when_emitting_private_identifier_downlevel, node.name.escapedText);
                }
            }