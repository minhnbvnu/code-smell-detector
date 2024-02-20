function getStaticTypeOfReferencedJsxConstructor(context) {
                if (isJsxIntrinsicIdentifier(context.tagName)) {
                    const result = getIntrinsicAttributesTypeFromJsxOpeningLikeElement(context);
                    const fakeSignature = createSignatureForJSXIntrinsic(context, result);
                    return getOrCreateTypeFromSignature(fakeSignature);
                }
                const tagType = checkExpressionCached(context.tagName);
                if (tagType.flags & 128 /* StringLiteral */) {
                    const result = getIntrinsicAttributesTypeFromStringLiteralType(tagType, context);
                    if (!result) {
                        return errorType;
                    }
                    const fakeSignature = createSignatureForJSXIntrinsic(context, result);
                    return getOrCreateTypeFromSignature(fakeSignature);
                }
                return tagType;
            }