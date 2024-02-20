function textRangeIsCollapsed(textRange) {
        return textRange.compareEndPoints("StartToEnd", textRange) == 0;
    }