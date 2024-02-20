function getRegularTypeOfObjectLiteral(type) {
                if (!(isObjectLiteralType2(type) && getObjectFlags(type) & 8192 /* FreshLiteral */)) {
                    return type;
                }
                const regularType = type.regularType;
                if (regularType) {
                    return regularType;
                }
                const resolved = type;
                const members = transformTypeOfMembers(type, getRegularTypeOfObjectLiteral);
                const regularNew = createAnonymousType(resolved.symbol, members, resolved.callSignatures, resolved.constructSignatures, resolved.indexInfos);
                regularNew.flags = resolved.flags;
                regularNew.objectFlags |= resolved.objectFlags & ~8192 /* FreshLiteral */;
                type.regularType = regularNew;
                return regularNew;
            }