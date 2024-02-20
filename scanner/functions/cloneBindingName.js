function cloneBindingName(node) {
                        return elideInitializerAndSetEmitFlags(node);
                        function elideInitializerAndSetEmitFlags(node2) {
                            if (context.tracker.canTrackSymbol && isComputedPropertyName(node2) && isLateBindableName(node2)) {
                                trackComputedName(node2.expression, context.enclosingDeclaration, context);
                            }
                            let visited = visitEachChild(node2, elideInitializerAndSetEmitFlags, nullTransformationContext, 
                            /*nodesVisitor*/
                            void 0, elideInitializerAndSetEmitFlags);
                            if (isBindingElement(visited)) {
                                visited = factory.updateBindingElement(visited, visited.dotDotDotToken, visited.propertyName, visited.name, 
                                /*initializer*/
                                void 0);
                            }
                            if (!nodeIsSynthesized(visited)) {
                                visited = factory.cloneNode(visited);
                            }
                            return setEmitFlags(visited, 1 /* SingleLine */ | 33554432 /* NoAsciiEscaping */);
                        }
                    }