function netIDToWords(id) {
    id = parseInt(id.substring(NET_ID_PREFIX.length));
    let list = [];
    for (let word = 0; word < 6; ++word) {
        list.push(capitalize(NET_ID_WORD_TABLE[word][id & 31]));
        id >>= 5;
    }
    
    return list;
}