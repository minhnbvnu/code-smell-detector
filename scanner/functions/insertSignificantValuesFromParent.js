function insertSignificantValuesFromParent(data, dataParent = () => 0, noDataValue) {
    for (let i = 0, l = data.length; i < l; ++i) {
        if (data[i] === noDataValue) {
            data[i] = dataParent(i);
        }
    }
}