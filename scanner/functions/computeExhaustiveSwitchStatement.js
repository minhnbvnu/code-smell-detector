function computeExhaustiveSwitchStatement(node) {
                if (node.expression.kind === 218 /* TypeOfExpression */) {
                    const witnesses = getSwitchClauseTypeOfWitnesses(node);
                    if (!witnesses) {
                        return false;
                    }
                    const operandConstraint = getBaseConstraintOrType(checkExpressionCached(node.expression.expression));
                    const notEqualFacts = getNotEqualFactsFromTypeofSwitch(0, 0, witnesses);
                    if (operandConstraint.flags & 3 /* AnyOrUnknown */) {
                        return (556800 /* AllTypeofNE */ & notEqualFacts) === 556800 /* AllTypeofNE */;
                    }
                    return !someType(operandConstraint, (t) => (getTypeFacts(t) & notEqualFacts) === notEqualFacts);
                }
                const type = checkExpressionCached(node.expression);
                if (!isLiteralType(type)) {
                    return false;
                }
                const switchTypes = getSwitchClauseTypes(node);
                if (!switchTypes.length || some(switchTypes, isNeitherUnitTypeNorNever)) {
                    return false;
                }
                return eachTypeContainedIn(mapType(type, getRegularTypeOfLiteralType), switchTypes);
            }