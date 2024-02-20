function getTypeOfPropertyOfType(checker, type, property) {
        return getTypeOfPropertyOfName(checker, type, property.getName(), property.getEscapedName());
    }