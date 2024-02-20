function bindModuleAssignments(modAssns, env) {
    var workSet = modAssns.copy();

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

    while (workSet.size > 0) {
        let id = workSet.choose();
        let assn = workSet.get(id);
        workSet.remove(id);
        let dependents = new Dict();
        dependents.set(id, true);
        bindAssn(assn, dependents);
    }
}