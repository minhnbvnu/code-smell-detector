function getElementsOfBindingOrAssignmentPattern(name) {
            switch (name.kind) {
                case 203 /* ObjectBindingPattern */:
                case 204 /* ArrayBindingPattern */:
                case 206 /* ArrayLiteralExpression */:
                    return name.elements;
                case 207 /* ObjectLiteralExpression */:
                    return name.properties;
            }
        }