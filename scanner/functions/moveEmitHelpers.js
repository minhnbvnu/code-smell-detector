function moveEmitHelpers(source, target, predicate) {
            const sourceEmitNode = source.emitNode;
            const sourceEmitHelpers = sourceEmitNode && sourceEmitNode.helpers;
            if (!some(sourceEmitHelpers))
                return;
            const targetEmitNode = getOrCreateEmitNode(target);
            let helpersRemoved = 0;
            for (let i = 0; i < sourceEmitHelpers.length; i++) {
                const helper = sourceEmitHelpers[i];
                if (predicate(helper)) {
                    helpersRemoved++;
                    targetEmitNode.helpers = appendIfUnique(targetEmitNode.helpers, helper);
                }
                else if (helpersRemoved > 0) {
                    sourceEmitHelpers[i - helpersRemoved] = helper;
                }
            }
            if (helpersRemoved > 0) {
                sourceEmitHelpers.length -= helpersRemoved;
            }
        }