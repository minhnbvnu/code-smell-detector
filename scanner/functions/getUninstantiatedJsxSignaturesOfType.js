function getUninstantiatedJsxSignaturesOfType(elementType, caller) {
                if (elementType.flags & 4 /* String */) {
                    return [anySignature];
                }
                else if (elementType.flags & 128 /* StringLiteral */) {
                    const intrinsicType = getIntrinsicAttributesTypeFromStringLiteralType(elementType, caller);
                    if (!intrinsicType) {
                        error(caller, Diagnostics.Property_0_does_not_exist_on_type_1, elementType.value, "JSX." + JsxNames.IntrinsicElements);
                        return emptyArray;
                    }
                    else {
                        const fakeSignature = createSignatureForJSXIntrinsic(caller, intrinsicType);
                        return [fakeSignature];
                    }
                }
                const apparentElemType = getApparentType(elementType);
                let signatures = getSignaturesOfType(apparentElemType, 1 /* Construct */);
                if (signatures.length === 0) {
                    signatures = getSignaturesOfType(apparentElemType, 0 /* Call */);
                }
                if (signatures.length === 0 && apparentElemType.flags & 1048576 /* Union */) {
                    signatures = getUnionSignatures(map(apparentElemType.types, (t) => getUninstantiatedJsxSignaturesOfType(t, caller)));
                }
                return signatures;
            }