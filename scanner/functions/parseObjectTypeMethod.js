function parseObjectTypeMethod(marker, isStatic, key) {
        var optional = false, value;
        value = parseObjectTypeMethodish(marker);

        return markerApply(marker, delegate.createObjectTypeProperty(
            key,
            value,
            optional,
            isStatic
        ));
    }