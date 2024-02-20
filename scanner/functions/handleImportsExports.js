function handleImportsExports(context, modules, declarationType, includeExports) {
        return function (node) {
            const module = getModule(node);
            if (module) {
                checkAndReport(context, node, modules, declarationType, includeExports);
                const currentNode = { node, declarationType };
                let nodes = [currentNode];
                if (modules.has(module)) {
                    const previousNodes = modules.get(module);
                    nodes = [...previousNodes, currentNode];
                }
                modules.set(module, nodes);
            }
        };
    }