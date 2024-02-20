function getSiblingsOfContext(context) {
                if (!context.siblings) {
                    const siblings = [];
                    for (const type of getSiblingsOfContext(context.parent)) {
                        if (isObjectLiteralType2(type)) {
                            const prop = getPropertyOfObjectType(type, context.propertyName);
                            if (prop) {
                                forEachType(getTypeOfSymbol(prop), (t) => {
                                    siblings.push(t);
                                });
                            }
                        }
                    }
                    context.siblings = siblings;
                }
                return context.siblings;
            }