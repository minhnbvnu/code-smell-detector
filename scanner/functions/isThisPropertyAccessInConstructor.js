function isThisPropertyAccessInConstructor(node, prop) {
                return (isConstructorDeclaredProperty(prop) || isThisProperty(node) && isAutoTypedProperty(prop)) && getThisContainer(node, 
                /*includeArrowFunctions*/
                true, 
                /*includeClassComputedPropertyName*/
                false) === getDeclaringConstructor(prop);
            }