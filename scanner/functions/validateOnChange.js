function validateOnChange(element, rules, successMessage, errorMessage) {
    $(document).on('focus', element, function(e) {
        e.preventDefault();
        //resetMessages(element);
        return false;
    });
    $(document).on('blur', element, function(e) {
        e.preventDefault();
        var result = approve.value($(element).val(), rules);
        if (result.approved) {
            isSuccess(element, successMessage);
        } else {
            isError(element, errorMessage);
        }
        return false;
    })
}