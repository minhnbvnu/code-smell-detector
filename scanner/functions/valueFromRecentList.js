function valueFromRecentList() {
        var current = popup.getData(popup.getRow());
        if (current && !current.error)
            return current.value || current.caption || current;
    }