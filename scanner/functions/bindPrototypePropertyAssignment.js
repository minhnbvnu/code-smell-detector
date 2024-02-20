function bindPrototypePropertyAssignment(lhs, parent3) {
                const classPrototype = lhs.expression;
                const constructorFunction = classPrototype.expression;
                setParent(constructorFunction, classPrototype);
                setParent(classPrototype, lhs);
                setParent(lhs, parent3);
                bindPropertyAssignment(constructorFunction, lhs, 
                /*isPrototypeProperty*/
                true, 
                /*containerIsClass*/
                true);
            }