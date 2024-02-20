function ClientUiCommands(app, controlbox) {
        this.app = app;
        this.controlbox = controlbox;

        this.addDefaultAliases();
        this.bindCommand(buildCommandFunctions());
    }