function wordsToNetID(list) {
    let id = 0;
    for (let word = 5; word >= 0; --word) {
        id <<= 5;
        id |= NET_ID_WORD_TABLE[word].indexOf(list[word].toLowerCase());
    }
    
    return NET_ID_PREFIX + ('' + id).padStart(10, '0');
}