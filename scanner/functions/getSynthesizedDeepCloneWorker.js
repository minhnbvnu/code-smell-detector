function getSynthesizedDeepCloneWorker(node, replaceNode) {
            const nodeClone = replaceNode ? (n) => getSynthesizedDeepCloneWithReplacements(n, 
            /*includeTrivia*/
            true, replaceNode) : getSynthesizedDeepClone;
            const nodesClone = replaceNode ? (ns) => ns && getSynthesizedDeepClonesWithReplacements(ns, 
            /*includeTrivia*/
            true, replaceNode) : (ns) => ns && getSynthesizedDeepClones(ns);
            const visited = visitEachChild(node, nodeClone, nullTransformationContext, nodesClone, nodeClone);
            if (visited === node) {
                const clone2 = isStringLiteral(node) ? setOriginalNode(factory.createStringLiteralFromNode(node), node) : isNumericLiteral(node) ? setOriginalNode(factory.createNumericLiteral(node.text, node.numericLiteralFlags), node) : factory.cloneNode(node);
                return setTextRange(clone2, node);
            }
            visited.parent = void 0;
            return visited;
        }