function makeReverseMap(source) {
            const result = [];
            source.forEach((value, name) => {
                result[value] = name;
            });
            return result;
        }