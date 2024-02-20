function getAllDayHtml(allOptions) {
        return allOptions.allDayHtml || htmlEscape(allOptions.allDayText);
    }