function InitHandler(connection) {
        this.connection = connection;

        this.startRequested = false;
        this.startCompleted = false;
        this.connectionStopped = false;
    }