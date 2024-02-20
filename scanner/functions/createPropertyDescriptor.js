function createPropertyDescriptor(attributes, singleLine) {
                const properties = [];
                tryAddPropertyAssignment(properties, "enumerable", asExpression(attributes.enumerable));
                tryAddPropertyAssignment(properties, "configurable", asExpression(attributes.configurable));
                let isData = tryAddPropertyAssignment(properties, "writable", asExpression(attributes.writable));
                isData = tryAddPropertyAssignment(properties, "value", attributes.value) || isData;
                let isAccessor2 = tryAddPropertyAssignment(properties, "get", attributes.get);
                isAccessor2 = tryAddPropertyAssignment(properties, "set", attributes.set) || isAccessor2;
                Debug.assert(!(isData && isAccessor2), "A PropertyDescriptor may not be both an accessor descriptor and a data descriptor.");
                return createObjectLiteralExpression(properties, !singleLine);
            }