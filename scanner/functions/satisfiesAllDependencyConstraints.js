function satisfiesAllDependencyConstraints(dependencyConstraints) {
        if (dependencyConstraints == null) {
            return true;
        }
        for (const [packageName, constraint] of Object.entries(dependencyConstraints)) {
            if (!satisfiesDependencyConstraint(packageName, constraint)) {
                return false;
            }
        }
        return true;
    }