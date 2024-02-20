function couldBeTupleType(type) {
                const properties = type.getProperties();
                if (properties.length === 0) {
                    return false;
                }
                let i = 0;
                for (; i < properties.length; ++i) {
                    const name = properties[i].name;
                    if (String(i) !== name) {
                        if (i === 0) {
                            // if there are no integer properties, this is not a tuple
                            return false;
                        }
                        break;
                    }
                }
                for (; i < properties.length; ++i) {
                    if (String(+properties[i].name) === properties[i].name) {
                        return false; // if there are any other numeric properties, this is not a tuple
                    }
                }
                return true;
            }