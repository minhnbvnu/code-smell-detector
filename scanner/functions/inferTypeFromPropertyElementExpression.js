function inferTypeFromPropertyElementExpression(parent2, node, usage) {
                if (node === parent2.argumentExpression) {
                    usage.isNumberOrString = true;
                    return;
                }
                else {
                    const indexType = checker.getTypeAtLocation(parent2.argumentExpression);
                    const indexUsage = createEmptyUsage();
                    calculateUsageOfNode(parent2, indexUsage);
                    if (indexType.flags & 296 /* NumberLike */) {
                        usage.numberIndex = indexUsage;
                    }
                    else {
                        usage.stringIndex = indexUsage;
                    }
                }
            }