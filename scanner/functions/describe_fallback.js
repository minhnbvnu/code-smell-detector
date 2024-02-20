function describe_fallback(value, recursionLimit) {
    let defaultString = String(value);
    if (defaultString !== BAD_TO_STRING_RESULT) {
        return defaultString;
    }
    return describe_Object(value, recursionLimit);
}