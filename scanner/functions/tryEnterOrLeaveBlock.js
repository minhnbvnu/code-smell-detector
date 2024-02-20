function tryEnterOrLeaveBlock(operationIndex) {
                if (blocks) {
                    for (; blockIndex < blockActions.length && blockOffsets[blockIndex] <= operationIndex; blockIndex++) {
                        const block = blocks[blockIndex];
                        const blockAction = blockActions[blockIndex];
                        switch (block.kind) {
                            case 0 /* Exception */:
                                if (blockAction === 0 /* Open */) {
                                    if (!exceptionBlockStack) {
                                        exceptionBlockStack = [];
                                    }
                                    if (!statements) {
                                        statements = [];
                                    }
                                    exceptionBlockStack.push(currentExceptionBlock);
                                    currentExceptionBlock = block;
                                }
                                else if (blockAction === 1 /* Close */) {
                                    currentExceptionBlock = exceptionBlockStack.pop();
                                }
                                break;
                            case 1 /* With */:
                                if (blockAction === 0 /* Open */) {
                                    if (!withBlockStack) {
                                        withBlockStack = [];
                                    }
                                    withBlockStack.push(block);
                                }
                                else if (blockAction === 1 /* Close */) {
                                    withBlockStack.pop();
                                }
                                break;
                        }
                    }
                }
            }