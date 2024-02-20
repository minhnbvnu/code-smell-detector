function checkPropertyAccess(node, objectName, propertyName) {
                if (propertyName === null) {
                    return;
                }
                const matchedObject = restrictedProperties.get(objectName);
                const matchedObjectProperty = matchedObject ? matchedObject.get(propertyName) : globallyRestrictedObjects.get(objectName);
                const globalMatchedProperty = globallyRestrictedProperties.get(propertyName);
                if (matchedObjectProperty) {
                    const message = matchedObjectProperty.message ? ` ${matchedObjectProperty.message}` : "";
                    context.report({
                        node,
                        messageId: "restrictedObjectProperty",
                        data: {
                            objectName,
                            propertyName,
                            message
                        }
                    });
                }
                else if (globalMatchedProperty) {
                    const message = globalMatchedProperty.message ? ` ${globalMatchedProperty.message}` : "";
                    context.report({
                        node,
                        messageId: "restrictedProperty",
                        data: {
                            propertyName,
                            message
                        }
                    });
                }
            }