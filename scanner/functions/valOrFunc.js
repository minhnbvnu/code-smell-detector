function valOrFunc(dataRow, column) {
    var result, calculator;
    if (dataRow) {
        result = dataRow[column.name];
        calculator = (typeof result)[0] === 'f' && result || column.calculator;
        if (calculator) {
            result = calculator(dataRow, column.name);
        }
    }
    return result || result === 0 || result === false ? result : '';
}