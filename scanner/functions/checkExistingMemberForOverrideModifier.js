function checkExistingMemberForOverrideModifier(node, staticType, baseStaticType, baseWithThis, type, typeWithThis, member, memberIsParameterProperty, reportErrors2 = true) {
                const declaredProp = member.name && getSymbolAtLocation(member.name) || getSymbolAtLocation(member);
                if (!declaredProp) {
                    return 0 /* Ok */;
                }
                return checkMemberForOverrideModifier(node, staticType, baseStaticType, baseWithThis, type, typeWithThis, hasOverrideModifier(member), hasAbstractModifier(member), isStatic(member), memberIsParameterProperty, symbolName(declaredProp), reportErrors2 ? member : void 0);
            }