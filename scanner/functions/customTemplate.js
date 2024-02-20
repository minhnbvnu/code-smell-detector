function customTemplate() {
        return this.duration.asSeconds() >= 86400 ? "w [weeks], d [days]" : "hh:mm:ss";
    }