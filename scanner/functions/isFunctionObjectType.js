function isFunctionObjectType(type) {
                const resolved = resolveStructuredTypeMembers(type);
                return !!(resolved.callSignatures.length || resolved.constructSignatures.length || resolved.members.get("bind") && isTypeSubtypeOf(type, globalFunctionType));
            }