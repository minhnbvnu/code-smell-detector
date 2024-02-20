function registerConditionsToGroup(conditions) {
                for (let i = 0; i < conditions.length; ++i) {
                    const condition = conditions[i];
                    if (condition.group) {
                        let group = groupMap.get(condition.group);
                        if (!group) {
                            group = [];
                            groupMap.set(condition.group, group);
                        }
                        group.push(condition);
                    }
                }
            }