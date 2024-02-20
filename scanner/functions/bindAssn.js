function bindAssn(assn, dependents) {
        let localID = assn.value;

        if (!assn.initializer) {
            env.bindUnique(localID, new Def(MODULE_DEF, resolveModulePath(env, localID)));
            return;
        }

        let headID = pathHead(assn.initializer);
        if (dependents.has(headID))
            throw new ReferenceError("cyclic dependency in module expression: " +
                                     cycleToString(dependents));
        if (workSet.has(headID)) {
            let assn2 = workSet.get(headID);
            workSet.remove(headID);
            dependents.set(headID, true);
            bindAssn(assn2, dependents);
        }

        env.bindUnique(localID, new Def(MODULE_DEF, resolveModulePath(env, assn.initializer)));
    }