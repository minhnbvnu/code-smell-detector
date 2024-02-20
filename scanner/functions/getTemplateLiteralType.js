function getTemplateLiteralType(texts, types) {
                const unionIndex = findIndex(types, (t) => !!(t.flags & (131072 /* Never */ | 1048576 /* Union */)));
                if (unionIndex >= 0) {
                    return checkCrossProductUnion(types) ? mapType(types[unionIndex], (t) => getTemplateLiteralType(texts, replaceElement(types, unionIndex, t))) : errorType;
                }
                if (contains(types, wildcardType)) {
                    return wildcardType;
                }
                const newTypes = [];
                const newTexts = [];
                let text = texts[0];
                if (!addSpans(texts, types)) {
                    return stringType;
                }
                if (newTypes.length === 0) {
                    return getStringLiteralType(text);
                }
                newTexts.push(text);
                if (every(newTexts, (t) => t === "")) {
                    if (every(newTypes, (t) => !!(t.flags & 4 /* String */))) {
                        return stringType;
                    }
                    if (newTypes.length === 1 && isPatternLiteralType(newTypes[0])) {
                        return newTypes[0];
                    }
                }
                const id = `${getTypeListId(newTypes)}|${map(newTexts, (t) => t.length).join(",")}|${newTexts.join("")}`;
                let type = templateLiteralTypes.get(id);
                if (!type) {
                    templateLiteralTypes.set(id, type = createTemplateLiteralType(newTexts, newTypes));
                }
                return type;
                function addSpans(texts2, types2) {
                    const isTextsArray = isArray(texts2);
                    for (let i = 0; i < types2.length; i++) {
                        const t = types2[i];
                        const addText = isTextsArray ? texts2[i + 1] : texts2;
                        if (t.flags & (2944 /* Literal */ | 65536 /* Null */ | 32768 /* Undefined */)) {
                            text += getTemplateStringForType(t) || "";
                            text += addText;
                            if (!isTextsArray)
                                return true;
                        }
                        else if (t.flags & 134217728 /* TemplateLiteral */) {
                            text += t.texts[0];
                            if (!addSpans(t.texts, t.types))
                                return false;
                            text += addText;
                            if (!isTextsArray)
                                return true;
                        }
                        else if (isGenericIndexType(t) || isPatternLiteralPlaceholderType(t)) {
                            newTypes.push(t);
                            newTexts.push(text);
                            text = addText;
                        }
                        else if (t.flags & 2097152 /* Intersection */) {
                            const added = addSpans(texts2[i + 1], t.types);
                            if (!added)
                                return false;
                        }
                        else if (isTextsArray) {
                            return false;
                        }
                    }
                    return true;
                }
            }