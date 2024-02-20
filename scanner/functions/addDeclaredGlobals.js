function addDeclaredGlobals(globalScope, configGlobals, { exportedVariables, enabledGlobals }) {
        // Define configured global variables.
        for (const id of new Set([...Object.keys(configGlobals), ...Object.keys(enabledGlobals)])) {
            /*
             * `ConfigOps.normalizeConfigGlobal` will throw an error if a configured global value is invalid. However, these errors would
             * typically be caught when validating a config anyway (validity for inline global comments is checked separately).
             */
            const configValue = configGlobals[id] === void 0 ? void 0 : ConfigOps.normalizeConfigGlobal(configGlobals[id]);
            const commentValue = enabledGlobals[id] && enabledGlobals[id].value;
            const value = commentValue || configValue;
            const sourceComments = enabledGlobals[id] && enabledGlobals[id].comments;
            if (value === "off") {
                continue;
            }
            let variable = globalScope.set.get(id);
            if (!variable) {
                variable = new eslintScope.Variable(id, globalScope);
                globalScope.variables.push(variable);
                globalScope.set.set(id, variable);
            }
            variable.eslintImplicitGlobalSetting = configValue;
            variable.eslintExplicitGlobal = sourceComments !== void 0;
            variable.eslintExplicitGlobalComments = sourceComments;
            variable.writeable = (value === "writable");
        }
        // mark all exported variables as such
        Object.keys(exportedVariables).forEach(name => {
            const variable = globalScope.set.get(name);
            if (variable) {
                variable.eslintUsed = true;
                variable.eslintExported = true;
            }
        });
        /*
         * "through" contains all references which definitions cannot be found.
         * Since we augment the global scope using configuration, we need to update
         * references and remove the ones that were added by configuration.
         */
        globalScope.through = globalScope.through.filter(reference => {
            const name = reference.identifier.name;
            const variable = globalScope.set.get(name);
            if (variable) {
                /*
                 * Links the variable and the reference.
                 * And this reference is removed from `Scope#through`.
                 */
                reference.resolved = variable;
                variable.references.push(reference);
                return false;
            }
            return true;
        });
    }