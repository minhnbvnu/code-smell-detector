function fixInitialMO(configuration, nodes) {
            for (var i = 0, m = nodes.length; i < m; i++) {
                var child = nodes[i];
                if (child && (!NodeUtil_js_1.default.isType(child, 'mspace') &&
                    (!NodeUtil_js_1.default.isType(child, 'TeXAtom') ||
                        (NodeUtil_js_1.default.getChildren(child)[0] &&
                            NodeUtil_js_1.default.getChildren(NodeUtil_js_1.default.getChildren(child)[0]).length)))) {
                    if (NodeUtil_js_1.default.isEmbellished(child) ||
                        (NodeUtil_js_1.default.isType(child, 'TeXAtom') && NodeUtil_js_1.default.getTexClass(child) === MmlNode_js_1.TEXCLASS.REL)) {
                        var mi = configuration.nodeFactory.create('node', 'mi');
                        nodes.unshift(mi);
                    }
                    break;
                }
            }
        }