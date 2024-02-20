function getNextInvalidatedProject(state, buildOrder, reportQueue) {
            const info = getNextInvalidatedProjectCreateInfo(state, buildOrder, reportQueue);
            if (!info)
                return info;
            return createInvalidatedProjectWithInfo(state, info, buildOrder);
        }