function getClassConfig(className) {

    // console.log('getClassConfig: ' + className);
    className = className.replace(/\./g, '_');
    if (!(className in classConfigs)) {
        throw new Error('invalid class name: ' + className);
    }

    const curClass = classConfigs[className];

    const result = { ...curClass};

    result.propsDefinedByThree = [];
    result.propsDefinedByThree = result.propsDefinedByThree.concat(curClass.propsDefinedByThree || []);

    // combine cur props with superclass properties for allProperties
    result.allProperties = {};
    result.properties = result.properties || {};
    if (curClass.superClass && curClass.superClass !== classConfigs._defaults.superClass) {
        const superClassConfig = getClassConfig(curClass.superClass);
        Object.assign(result.allProperties, superClassConfig.allProperties);

        result.propsDefinedByThree = result.propsDefinedByThree.concat(superClassConfig.propsDefinedByThree || []);
    }
    Object.assign(result.allProperties, curClass.properties);

    // we want to inherit all propsDefinedByThree

    // add defaults
    _.defaults(
        result,
        classConfigs._defaults
    );

    if ('type' in result.allProperties && result.allProperties.type instanceof Types.String) {
        if ('type' in result.properties) {
            result.properties.type.defaultValue = className;
        } else {
            result.properties.type = new Types.String(className);
            result.allProperties.type = result.properties.type;
        }
    }

    return result;
}