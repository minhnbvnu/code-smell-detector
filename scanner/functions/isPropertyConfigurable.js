function isPropertyConfigurable(obj, propName) {
    var propertyDescriptor = getPropertyDescriptor(obj, propName);

    return propertyDescriptor ? propertyDescriptor.configurable : true;
}