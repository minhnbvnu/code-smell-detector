function clearMUC(config) {
        //something has happened, so clear out our presence indicators
        if (RED.settings.verbose || LOGITALL) {
            config.log("cleared all MUC membership");
        }
        config.MUCs = {};
    }