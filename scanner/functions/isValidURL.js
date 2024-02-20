function isValidURL(str) {
    const regex = /(http|https):\/\/(\w+:?\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%\-\/]))?/;
    return regex.test(str);
}