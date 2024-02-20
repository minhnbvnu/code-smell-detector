function ValidatorEnable(val, enable) {
    val.enabled = (enable != false);
    ValidatorValidate(val);
    ValidatorUpdateIsValid();
}