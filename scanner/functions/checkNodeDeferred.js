function checkNodeDeferred(node) {
                const enclosingFile = getSourceFileOfNode(node);
                const links = getNodeLinks(enclosingFile);
                if (!(links.flags & 1 /* TypeChecked */)) {
                    links.deferredNodes || (links.deferredNodes = /* @__PURE__ */ new Set());
                    links.deferredNodes.add(node);
                }
                else {
                    Debug.assert(!links.deferredNodes, "A type-checked file should have no deferred nodes.");
                }
            }