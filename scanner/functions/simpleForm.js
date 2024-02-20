function simpleForm(formSelector, arg) {
    var success, formEl;
    if (typeof arg === "function") {
        success = arg;
    } else {
        success = function (response) {
            window.location.href = arg;
        };
    }
    if (typeof formSelector === 'string'){
        formEl = document.querySelector(formSelector)
    } else {
        formEl = formSelector
    }

    formEl.onsubmit = (evt) => {
        var el = evt.target;
        $.ajax({
            type: el.getAttribute("method") || "POST",
            url: el.getAttribute("action"),
            data: $(el).serialize(),
            success: success,
            error: function (request, status, error) {
                notify(request.responseText);
            },
        });
        return false;
    };
}