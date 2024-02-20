function RequiredFieldValidatorEvaluateIsValid(val) {
    return (ValidatorTrim(ValidatorGetValue(val.controltovalidate)) != ValidatorTrim(val.initialvalue))
}