function ExternalEditor(text) {
        if (text === void 0) { text = ""; }
        this.text = "";
        this.text = text;
        this.determineEditor();
        this.createTemporaryFile();
    }