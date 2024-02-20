function singularOf(name) {
    endings.find(function(ending) {
        if (ending.plural.test(name)) {
            name = name.replace(ending.plural, ending.singular);
            return true;
        }
    });
    return name;
}