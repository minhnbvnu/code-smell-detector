function sumValues(items, propertyName) {
        return items.reduce(function (accumulator, current) {
            return accumulator + current[propertyName];
        }, 0);
    }