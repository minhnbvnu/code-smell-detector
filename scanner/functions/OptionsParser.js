function OptionsParser(host) {
        this.host = host;
        this.DEFAULT_SHORT_FLAG = "-";
        this.DEFAULT_LONG_FLAG = "--";
        this.unnamed = [];
        this.options = [];
    }