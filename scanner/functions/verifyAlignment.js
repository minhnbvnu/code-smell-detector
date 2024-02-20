function verifyAlignment(node) {
                createGroups(node).forEach(group => {
                    const properties = group.filter(isKeyValueProperty);
                    if (properties.length > 0 && isSingleLineProperties(properties)) {
                        verifyListSpacing(properties, multiLineOptions);
                    }
                    else {
                        verifyGroupAlignment(properties);
                    }
                });
            }