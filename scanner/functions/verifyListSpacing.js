function verifyListSpacing(properties, lineOptions) {
                const length = properties.length;
                for (let i = 0; i < length; i++) {
                    verifySpacing(properties[i], lineOptions);
                }
            }