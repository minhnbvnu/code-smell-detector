function decamelize(str, joinString) {
        const lowercase = str.toLowerCase();
        joinString = joinString || '-';
        let notCamelcase = '';
        for (let i = 0; i < str.length; i++) {
            const chrLower = lowercase.charAt(i);
            const chrString = str.charAt(i);
            if (chrLower !== chrString && i > 0) {
                notCamelcase += `${joinString}${lowercase.charAt(i)}`;
            }
            else {
                notCamelcase += chrString;
            }
        }
        return notCamelcase;
    }