function validateArrayIndexOption(options) {
        if(options.showArrayIndex === undefined){
            options.showArrayIndex = true;
        } else {
            // Force to boolean just in case
            options.showArrayIndex = options.showArrayIndex ? true: false;
        }

        return options;
    }