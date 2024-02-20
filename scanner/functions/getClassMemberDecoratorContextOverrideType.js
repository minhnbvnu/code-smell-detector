function getClassMemberDecoratorContextOverrideType(nameType, isPrivate, isStatic2) {
                const key = `${isPrivate ? "p" : "P"}${isStatic2 ? "s" : "S"}${nameType.id}`;
                let overrideType = decoratorContextOverrideTypeCache.get(key);
                if (!overrideType) {
                    const members = createSymbolTable();
                    members.set("name", createProperty("name", nameType));
                    members.set("private", createProperty("private", isPrivate ? trueType : falseType));
                    members.set("static", createProperty("static", isStatic2 ? trueType : falseType));
                    overrideType = createAnonymousType(
                    /*symbol*/
                    void 0, members, emptyArray, emptyArray, emptyArray);
                    decoratorContextOverrideTypeCache.set(key, overrideType);
                }
                return overrideType;
            }