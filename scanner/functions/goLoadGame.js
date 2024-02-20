function goLoadGame() {
        loadManager.fetch(gameURL, 'text', jsonParser, processGameJSON, loadFailureCallback, loadWarningCallback, true);
    }