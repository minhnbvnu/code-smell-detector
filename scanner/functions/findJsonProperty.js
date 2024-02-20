function findJsonProperty(obj, name) {
            return find(obj.properties, (p) => isPropertyAssignment(p) && !!p.name && isStringLiteral(p.name) && p.name.text === name);
        }