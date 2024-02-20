function WebForm_EncodeCallback(parameter) {
    if (encodeURIComponent) {
        return encodeURIComponent(parameter);
    }
    else {
        return escape(parameter);
    }
}