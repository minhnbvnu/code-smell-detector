function getProperty(element, propertyName) {
        const layoutChildComponent = element.entity.layoutchild;

        // First attempt to get the value from the element's LayoutChildComponent, if present.
        if (layoutChildComponent && layoutChildComponent.enabled && layoutChildComponent[propertyName] !== undefined && layoutChildComponent[propertyName] !== null) {
            return layoutChildComponent[propertyName];
        } else if (element[propertyName] !== undefined) {
            return element[propertyName];
        }

        return PROPERTY_DEFAULTS[propertyName];
    }