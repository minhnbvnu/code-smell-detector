function checkDeferredNodes(context) {
                const links = getNodeLinks(context);
                if (links.deferredNodes) {
                    links.deferredNodes.forEach(checkDeferredNode);
                }
                links.deferredNodes = void 0;
            }