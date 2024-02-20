function splitLine(string, tag) {
    var newSB = JavaStringBufferWapper.$new()
    var newString = JavaStringWapper.$new(string)
    var lineNum = Math.ceil(newString.length() / 150)
    for (var i = 0; i < lineNum; i++) {
        var start = i * 150;
        var end = (i + 1) * 150
        newSB.append(tag)
        if (end > newString.length()) {
            newSB.append(newString.substring(start, newString.length()))
        } else {
            newSB.append(newString.substring(start, end))
        }
        newSB.append("\n")
    }
    var lineStr = "";
    if (newSB.length() > 0) {
        lineStr = newSB.deleteCharAt(newSB.length() - 1).toString()
    }
    return lineStr
}