function getPropertiesToAdd(file, span, checker) {
            var _a2, _b;
            const sourceTarget = getSourceTarget(getFixableErrorSpanExpression(file, span), checker);
            if (!sourceTarget) {
                return emptyArray;
            }
            const { source: sourceNode, target: targetNode } = sourceTarget;
            const target = shouldUseParentTypeOfProperty(sourceNode, targetNode, checker) ? checker.getTypeAtLocation(targetNode.expression) : checker.getTypeAtLocation(targetNode);
            if ((_b = (_a2 = target.symbol) == null ? void 0 : _a2.declarations) == null ? void 0 : _b.some((d) => getSourceFileOfNode(d).fileName.match(/\.d\.ts$/))) {
                return emptyArray;
            }
            return checker.getExactOptionalProperties(target);
        }