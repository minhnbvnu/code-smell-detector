function getFiltersByGroupId(groupId, filters) {
        return filters.filter((f) => {
            return f.groupId === groupId;
        });
    }