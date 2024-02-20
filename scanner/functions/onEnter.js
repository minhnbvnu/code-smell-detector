function onEnter(node, state) {
                    if (state) {
                        state.stackIndex++;
                        state.preserveSourceNewlinesStack[state.stackIndex] = preserveSourceNewlines;
                        state.containerPosStack[state.stackIndex] = containerPos;
                        state.containerEndStack[state.stackIndex] = containerEnd;
                        state.declarationListContainerEndStack[state.stackIndex] = declarationListContainerEnd;
                        const emitComments2 = state.shouldEmitCommentsStack[state.stackIndex] = shouldEmitComments(node);
                        const emitSourceMaps = state.shouldEmitSourceMapsStack[state.stackIndex] = shouldEmitSourceMaps(node);
                        onBeforeEmitNode == null ? void 0 : onBeforeEmitNode(node);
                        if (emitComments2)
                            emitCommentsBeforeNode(node);
                        if (emitSourceMaps)
                            emitSourceMapsBeforeNode(node);
                        beforeEmitNode(node);
                    }
                    else {
                        state = {
                            stackIndex: 0,
                            preserveSourceNewlinesStack: [void 0],
                            containerPosStack: [-1],
                            containerEndStack: [-1],
                            declarationListContainerEndStack: [-1],
                            shouldEmitCommentsStack: [false],
                            shouldEmitSourceMapsStack: [false]
                        };
                    }
                    return state;
                }