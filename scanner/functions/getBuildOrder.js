function getBuildOrder(state) {
            return state.buildOrder || createStateBuildOrder(state);
        }