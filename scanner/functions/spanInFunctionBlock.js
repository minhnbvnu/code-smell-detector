function spanInFunctionBlock(block) {
                    const nodeForSpanInBlock = block.statements.length ? block.statements[0] : block.getLastToken();
                    if (canFunctionHaveSpanInWholeDeclaration(block.parent)) {
                        return spanInNodeIfStartsOnSameLine(block.parent, nodeForSpanInBlock);
                    }
                    return spanInNode(nodeForSpanInBlock);
                }