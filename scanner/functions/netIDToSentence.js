function netIDToSentence(netID) {
    const list = netIDToWords(netID);
    return list[0] + " " + list[1] + ", " + list[2] + " " + list[3] + ", " + list[4] + " " + list[5];
}