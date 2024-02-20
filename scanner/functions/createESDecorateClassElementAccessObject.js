function createESDecorateClassElementAccessObject(name, access) {
                const properties = [];
                properties.push(createESDecorateClassElementAccessHasMethod(name));
                if (access.get)
                    properties.push(createESDecorateClassElementAccessGetMethod(name));
                if (access.set)
                    properties.push(createESDecorateClassElementAccessSetMethod(name));
                return factory2.createObjectLiteralExpression(properties);
            }