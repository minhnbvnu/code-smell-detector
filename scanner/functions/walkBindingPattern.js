function walkBindingPattern(pattern) {
                                    let elems;
                                    for (const elem of pattern.elements) {
                                        if (isOmittedExpression(elem))
                                            continue;
                                        if (isBindingPattern(elem.name)) {
                                            elems = concatenate(elems, walkBindingPattern(elem.name));
                                        }
                                        elems = elems || [];
                                        elems.push(factory2.createPropertyDeclaration(ensureModifiers(param), elem.name, 
                                        /*questionToken*/
                                        void 0, ensureType(elem, 
                                        /*type*/
                                        void 0), 
                                        /*initializer*/
                                        void 0));
                                    }
                                    return elems;
                                }