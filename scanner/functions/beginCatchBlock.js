function beginCatchBlock(variable) {
                Debug.assert(peekBlockKind() === 0 /* Exception */);
                let name;
                if (isGeneratedIdentifier(variable.name)) {
                    name = variable.name;
                    hoistVariableDeclaration(variable.name);
                }
                else {
                    const text = idText(variable.name);
                    name = declareLocal(text);
                    if (!renamedCatchVariables) {
                        renamedCatchVariables = /* @__PURE__ */ new Map();
                        renamedCatchVariableDeclarations = [];
                        context.enableSubstitution(79 /* Identifier */);
                    }
                    renamedCatchVariables.set(text, true);
                    renamedCatchVariableDeclarations[getOriginalNodeId(variable)] = name;
                }
                const exception = peekBlock();
                Debug.assert(exception.state < 1 /* Catch */);
                const endLabel = exception.endLabel;
                emitBreak(endLabel);
                const catchLabel = defineLabel();
                markLabel(catchLabel);
                exception.state = 1 /* Catch */;
                exception.catchVariable = name;
                exception.catchLabel = catchLabel;
                emitAssignment(name, factory2.createCallExpression(factory2.createPropertyAccessExpression(state, "sent"), 
                /*typeArguments*/
                void 0, []));
                emitNop();
            }