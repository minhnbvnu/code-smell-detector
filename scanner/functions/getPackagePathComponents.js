function getPackagePathComponents(filePath) {
            const components = getPathComponents(filePath);
            const nodeModulesIdx = components.lastIndexOf("node_modules");
            if (nodeModulesIdx === -1) {
                return void 0;
            }
            return components.slice(0, nodeModulesIdx + 2);
        }