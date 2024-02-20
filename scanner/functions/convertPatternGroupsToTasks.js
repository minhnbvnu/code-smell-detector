function convertPatternGroupsToTasks(positive, negative, dynamic) {
        return Object.keys(positive).map((base) => {
            return convertPatternGroupToTask(base, positive[base], negative, dynamic);
        });
    }