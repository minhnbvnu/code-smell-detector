function setSelectedServer(selectedServerUrl, namespace) {
            return {
                type: UPDATE_SELECTED_SERVER,
                payload: {
                    selectedServerUrl: selectedServerUrl,
                    namespace: namespace
                }
            }
        }