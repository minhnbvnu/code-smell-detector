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