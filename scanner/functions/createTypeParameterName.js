function createTypeParameterName(index) {
            return 84 /* T */ + index <= 90 /* Z */ ? String.fromCharCode(84 /* T */ + index) : `T${index}`;
        }