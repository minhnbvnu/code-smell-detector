function transformAutoAccessor(node) {
                const commentRange = getCommentRange(node);
                const sourceMapRange = getSourceMapRange(node);
                const name = node.name;
                let getterName = name;
                let setterName = name;
                if (isComputedPropertyName(name) && !isSimpleInlineableExpression(name.expression)) {
                    const cacheAssignment = findComputedPropertyNameCacheAssignment(name);
                    if (cacheAssignment) {
                        getterName = factory2.updateComputedPropertyName(name, visitNode(name.expression, visitor, isExpression));
                        setterName = factory2.updateComputedPropertyName(name, cacheAssignment.left);
                    }
                    else {
                        const temp = factory2.createTempVariable(hoistVariableDeclaration);
                        setSourceMapRange(temp, name.expression);
                        const expression = visitNode(name.expression, visitor, isExpression);
                        const assignment = factory2.createAssignment(temp, expression);
                        setSourceMapRange(assignment, name.expression);
                        getterName = factory2.updateComputedPropertyName(name, assignment);
                        setterName = factory2.updateComputedPropertyName(name, temp);
                    }
                }
                const modifiers = visitNodes2(node.modifiers, modifierVisitor, isModifier);
                const backingField = createAccessorPropertyBackingField(factory2, node, modifiers, node.initializer);
                setOriginalNode(backingField, node);
                setEmitFlags(backingField, 3072 /* NoComments */);
                setSourceMapRange(backingField, sourceMapRange);
                const getter = createAccessorPropertyGetRedirector(factory2, node, modifiers, getterName);
                setOriginalNode(getter, node);
                setCommentRange(getter, commentRange);
                setSourceMapRange(getter, sourceMapRange);
                const setter = createAccessorPropertySetRedirector(factory2, node, modifiers, setterName);
                setOriginalNode(setter, node);
                setEmitFlags(setter, 3072 /* NoComments */);
                setSourceMapRange(setter, sourceMapRange);
                return visitArray([backingField, getter, setter], accessorFieldResultVisitor, isClassElement);
            }