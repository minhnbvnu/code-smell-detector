function randomWord(count = 36) {
    return Math.random().toString(count).substring(2);
}