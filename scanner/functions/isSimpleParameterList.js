function isSimpleParameterList(params) {
        return params.every(isSimpleParameter);
    }