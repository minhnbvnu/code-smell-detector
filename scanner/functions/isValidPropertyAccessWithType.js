function isValidPropertyAccessWithType(node, isSuper, propertyName, type) {
                if (isTypeAny(type)) {
                    return true;
                }
                const prop = getPropertyOfType(type, propertyName);
                return !!prop && isPropertyAccessible(node, isSuper, 
                /* isWrite */
                false, type, prop);
            }