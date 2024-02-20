function isWithGender(obj) {
        return (obj['gender'] === exports.Gender.MALE || obj['gender'] === exports.Gender.FEMALE)
            && isValidProbablitiy(obj['genderProbability']);
    }