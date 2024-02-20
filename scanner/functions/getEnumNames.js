function getEnumNames(myEnum) {
        return Object.keys(myEnum).filter(x => isNaN(parseInt(x)));
    }