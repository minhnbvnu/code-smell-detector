function probabilityDataToJson(data) {
    return {
        probabilities: Seq.range(data.height()).map(k => Complex.realPartOf(data.cell(0, k))).toArray()
    };
}