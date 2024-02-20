function computeIndentation(node, startLine, inheritedIndentation, parent2, parentDynamicIndentation, effectiveParentStartLine) {
                const delta2 = SmartIndenter.shouldIndentChildNode(options, node) ? options.indentSize : 0;
                if (effectiveParentStartLine === startLine) {
                    return {
                        indentation: startLine === lastIndentedLine ? indentationOnLastIndentedLine : parentDynamicIndentation.getIndentation(),
                        delta: Math.min(options.indentSize, parentDynamicIndentation.getDelta(node) + delta2)
                    };
                }
                else if (inheritedIndentation === -1 /* Unknown */) {
                    if (node.kind === 20 /* OpenParenToken */ && startLine === lastIndentedLine) {
                        return { indentation: indentationOnLastIndentedLine, delta: parentDynamicIndentation.getDelta(node) };
                    }
                    else if (SmartIndenter.childStartsOnTheSameLineWithElseInIfStatement(parent2, node, startLine, sourceFile) || SmartIndenter.childIsUnindentedBranchOfConditionalExpression(parent2, node, startLine, sourceFile) || SmartIndenter.argumentStartsOnSameLineAsPreviousArgument(parent2, node, startLine, sourceFile)) {
                        return { indentation: parentDynamicIndentation.getIndentation(), delta: delta2 };
                    }
                    else {
                        return { indentation: parentDynamicIndentation.getIndentation() + parentDynamicIndentation.getDelta(node), delta: delta2 };
                    }
                }
                else {
                    return { indentation: inheritedIndentation, delta: delta2 };
                }
            }