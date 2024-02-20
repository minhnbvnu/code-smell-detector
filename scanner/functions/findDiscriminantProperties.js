function findDiscriminantProperties(sourceProperties, target) {
                let result;
                for (const sourceProperty of sourceProperties) {
                    if (isDiscriminantProperty(target, sourceProperty.escapedName)) {
                        if (result) {
                            result.push(sourceProperty);
                            continue;
                        }
                        result = [sourceProperty];
                    }
                }
                return result;
            }