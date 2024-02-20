function getContextualSignature(node) {
                Debug.assert(node.kind !== 171 /* MethodDeclaration */ || isObjectLiteralMethod(node));
                const typeTagSignature = getSignatureOfTypeTag(node);
                if (typeTagSignature) {
                    return typeTagSignature;
                }
                const type = getApparentTypeOfContextualType(node, 1 /* Signature */);
                if (!type) {
                    return void 0;
                }
                if (!(type.flags & 1048576 /* Union */)) {
                    return getContextualCallSignature(type, node);
                }
                let signatureList;
                const types = type.types;
                for (const current of types) {
                    const signature = getContextualCallSignature(current, node);
                    if (signature) {
                        if (!signatureList) {
                            signatureList = [signature];
                        }
                        else if (!compareSignaturesIdentical(signatureList[0], signature, 
                        /*partialMatch*/
                        false, 
                        /*ignoreThisTypes*/
                        true, 
                        /*ignoreReturnTypes*/
                        true, compareTypesIdentical)) {
                            return void 0;
                        }
                        else {
                            signatureList.push(signature);
                        }
                    }
                }
                if (signatureList) {
                    return signatureList.length === 1 ? signatureList[0] : createUnionSignature(signatureList[0], signatureList);
                }
            }