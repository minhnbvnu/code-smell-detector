function headersToList(headers) {
    var gson = GsonWapper.$new()
    var namesAndValues = getFieldValue(headers, F_header_namesAndValues)
    var jsonString = gson.toJson(namesAndValues)
    var namesAndValuesList = Java.cast(gson.fromJson(jsonString, ListWapper.class), ListWapper)
    return namesAndValuesList;
}