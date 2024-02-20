function RegularExpressionValidatorEvaluateIsValid(val) {
    var value = ValidatorGetValue(val.controltovalidate);
    if (ValidatorTrim(value).length == 0)
        return true;
    var rx = new RegExp(val.validationexpression);
    var matches = rx.exec(value);
    return (matches != null && value == matches[0]);
}