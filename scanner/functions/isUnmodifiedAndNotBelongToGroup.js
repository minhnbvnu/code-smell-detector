function isUnmodifiedAndNotBelongToGroup(condition) {
        return !(condition.modified || condition.group);
    }