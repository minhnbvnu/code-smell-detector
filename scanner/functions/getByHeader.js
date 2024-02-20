function getByHeader(namesAndValuesList, name) {
    var nameString = JavaStringWapper.$new(name)
    Java.perform(function () {
        var length = namesAndValuesList.size()
        var nameByList = "";
        do {
            length -= 2;
            if (length < 0) {
                return null;
            }
            // console.log("namesAndValuesList: "+namesAndValuesList.$className)
            nameByList = namesAndValuesList.get(JavaIntegerWapper.valueOf(length).intValue())
        } while (!nameString.equalsIgnoreCase(nameByList));
        return namesAndValuesList.get(length + 1);

    })
}