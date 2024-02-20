function getAttributeOption(name, type){
        // is attribute set ?
        let v = _dom.getElementDataAttribute(element, 'enlighter-' + name);

        // merge default values with provided element options
        const defaults = getOption(name);

        // string input
        if (v && v.length > 0){
            switch (type){

                // boolean flags
                case 'boolean':
                    // lc
                    v = v.toLowerCase().trim();

                    // boolean string expression given ?
                    if (v === 'true'){
                        return true;
                    }else if (v === 'false'){
                        return false;
                    }else{
                        return defaults;
                    }

                case 'int':
                    // parse integer (fault tolerant)
                    v = parseInt(v);

                    // valid number ?
                    if (isNaN(v)){
                        return defaults;
                    }else{
                        return v;
                    }
                    
                // string
                default:
                    return v;
            }

        // use defaults
        }else{
            return defaults;
        }
    }