function netIDToString(netID, name) {
    let text = netIDToSentence(netID);
    if (name && (name.toLowerCase() !== 'unknown') && (name !== '')) {
        text = name.toUpperCase().substring(0, MAX_ONLINE_NAME_LENGTH) + ' (' + text + ')';        
    }
    return text;
}