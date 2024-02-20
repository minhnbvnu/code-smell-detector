function naturalOutOfOrder(name, previousName, order) {
                switch (order) {
                    case 'alphabetically':
                        return name < previousName;
                    case 'alphabetically-case-insensitive':
                        return name.toLowerCase() < previousName.toLowerCase();
                    case 'natural':
                        return (0, natural_compare_lite_1.default)(name, previousName) !== 1;
                    case 'natural-case-insensitive':
                        return ((0, natural_compare_lite_1.default)(name.toLowerCase(), previousName.toLowerCase()) !== 1);
                }
            }