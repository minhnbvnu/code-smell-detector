function isPriorityDone(context) {
        var priorityDone = true,
            priorityWait = context.config.priorityWait,
            priorityName, i;
        if (priorityWait) {
            for (i = 0; (priorityName = priorityWait[i]); i++) {
                if (!context.loaded[priorityName]) {
                    priorityDone = false;
                    break;
                }
            }
            if (priorityDone) {
                delete context.config.priorityWait;
            }
        }
        return priorityDone;
    }