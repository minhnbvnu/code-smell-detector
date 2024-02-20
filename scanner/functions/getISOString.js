function getISOString(date) {
        return date.toISOString().split('.')[0] + 'Z';
    }