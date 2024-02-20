function configsPlugin() {
            return {
                statePlugins: {
                    spec: {
                        actions: specActions,
                        selectors: specSelectors
                    },
                    configs: {
                        reducers: _reducers2.default,
                        actions: actions,
                        selectors: selectors
                    }
                }
            }
        }