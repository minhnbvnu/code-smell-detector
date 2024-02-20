function extendWithGender(sourceObj, gender, genderProbability) {
        var extension = { gender: gender, genderProbability: genderProbability };
        return Object.assign({}, sourceObj, extension);
    }